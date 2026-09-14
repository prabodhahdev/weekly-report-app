import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Check, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

import ReportsListPage from "@/components/reports/list/ReportsListPage.jsx";
import { fetchReports } from "@/api/reportsApi.js";
import apiFetch from "@/api/apiFetch.js";

const PAGE_SIZE = 6;

const EMPTY_FILTERS = {
    project: "",
    status: "",
    from: "",
    to: "",
    member: "",
};

export default function ReportsPage() {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: PAGE_SIZE,
        total: 0,
        totalPages: 1,
    });
    const [filters, setFilters] = useState(EMPTY_FILTERS);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadReports();
    }, [page, filters]);

    async function loadReports() {
        try {
            setLoading(true);

            const data = await fetchReports({
                page,
                limit: PAGE_SIZE,
                project: filters.project,
                status: filters.status,
                from: filters.from,
                to: filters.to,
                member: filters.member,
            });

            setReports(data.reports || []);
            setPagination(
                data.pagination || {
                    page,
                    limit: PAGE_SIZE,
                    total: data.reports?.length || 0,
                    totalPages: 1,
                }
            );
        } catch (error) {
            console.error("Fetch team reports error:", error);
            toast.error(error.message || "Failed to load team reports");
        } finally {
            setLoading(false);
        }
    }

    function handleFiltersChange(next) {
        setFilters(next);
        setPage(1);
    }

    async function handleReview(reportId, action, comment = "") {
        try {
            const response = await apiFetch(
                `/api/reports/${reportId}/review`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        action,
                        comment,
                    }),
                }
            );

            const data = await response.json();

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

            loadReports();

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
        const reportId = report._id || report.id;

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

    if (loading && reports.length === 0) {
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
            pagination={pagination}
            onPageChange={setPage}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            pageSize={PAGE_SIZE}
        />
    );
}