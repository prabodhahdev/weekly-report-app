import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import ReportsListPage from "@/components/reports/list/ReportsListPage.jsx";
import apiFetch from "@/api/apiFetch.js";

const EDITABLE_STATUSES = [
    "draft",
    "needs_correction",
];

export default function MyReportsPage() {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    async function fetchReports() {
        try {
            const response = await apiFetch(
                "/api/reports/my-reports"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load reports"
                );
            }

            setReports(data.reports || []);

        } catch (error) {
            console.error(
                "Fetch my reports error:",
                error
            );

            toast.error(
                error.message || "Failed to load reports"
            );

        } finally {
            setLoading(false);
        }
    }

    function getActions(report) {
        const editable =
            EDITABLE_STATUSES.includes(report.status);

        const actions = [
            {
                label: "View",
                icon: Eye,
                onClick: () =>
                    navigate(
                        `/member-report/${report._id}`
                    ),
            },
        ];

        if (editable) {
            actions.push({
                label: "Edit",
                icon: Pencil,
                onClick: () =>
                    navigate(
                        `/member-report/${report._id}/edit`
                    ),
            });
        }

        return actions;
    }

    if (loading) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Loading reports...
            </div>
        );
    }

    return (
        <ReportsListPage
            title="My Reports"
            description="Your weekly report history and current statuses."
            reports={reports}
            getActions={getActions}
            onNewReport={() =>
                navigate("/member-report")
            }
        />
    );
}