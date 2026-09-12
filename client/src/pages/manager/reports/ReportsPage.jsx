import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Check, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

import ReportsListPage from "@/components/reports/list/ReportsListPage.jsx";
import apiFetch from "@/api/apiFetch.js";

export default function ReportsPage() {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    async function fetchReports() {
        try {
            setLoading(true);

            const response = await apiFetch("/api/reports");

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load team reports"
                );
            }

            const teamReports = (data.reports || []).filter(
                (report) => report.status !== "draft"
            );

            setReports(teamReports);

        } catch (error) {
            console.error(
                "Fetch team reports error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load team reports"
            );

        } finally {
            setLoading(false);
        }
    }

    async function handleReview(
        reportId,
        action,
        comment = ""
    ) {
        try {
            const response = await apiFetch(
                `/api/reports/${reportId}/review`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        action,
                        comment,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to review report"
                );
            }

            toast.success(
                data.message ||
                "Report reviewed successfully"
            );

            fetchReports();

        } catch (error) {
            console.error(
                "Review report error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to review report"
            );
        }
    }

    function getActions(report) {
        const reportId =
            report._id || report.id;

        const actions = [
            {
                label: "View",
                icon: Eye,
                onClick: () =>
                    navigate(
                        `/manager-report/${reportId}`
                    ),
            },
        ];

        if (report.status === "submitted") {
            actions.push(
                {
                    label: "Approve",
                    icon: Check,
                    onClick: () =>
                        handleReview(
                            reportId,
                            "approved",
                            ""
                        ),
                },
                {
                    label: "Request Changes",
                    icon: MessageSquare,
                    onClick: () =>
                        navigate(
                            `/manager-report/${reportId}`
                        ),
                }
            );
        }

        return actions;
    }

    if (loading) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Loading team reports...
            </div>
        );
    }

    return (
        <ReportsListPage
            title="Team Reports"
            description="View and review weekly reports submitted by your team."
            reports={reports}
            showMember={true}
            getActions={getActions}
            cardTitle="Team reports"
            role="manager"
        />
    );
}