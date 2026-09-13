import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import ReportsListPage from "@/components/reports/list/ReportsListPage.jsx";
import { fetchMyReports } from "@/api/reportsApi.js";

const PAGE_SIZE = 6;

const EDITABLE_STATUSES = [
    "draft",
    "needs_correction",
];

const EMPTY_FILTERS = {
    project: "",
    status: "",
    from: "",
    to: "",
    member: "",
};

export default function MyReportsPage() {
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
        fetchReports();
    }, [page, filters]);

    async function fetchReports() {
        try {
            setLoading(true);

            const data = await fetchMyReports({
                page,
                limit: PAGE_SIZE,
                project: filters.project,
                status: filters.status,
                from: filters.from,
                to: filters.to,
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
            console.error("Fetch my reports error:", error);
            toast.error(error.message || "Failed to load reports");
        } finally {
            setLoading(false);
        }
    }

    function handleFiltersChange(next) {
        setFilters(next);
        setPage(1);
    }

    function getActions(report) {
        const editable = EDITABLE_STATUSES.includes(report.status);

        const actions = [
            {
                label: "View",
                icon: Eye,
                onClick: () => navigate(`/member-report/${report._id}`),
            },
        ];

        if (editable) {
            actions.push({
                label: "Edit",
                icon: Pencil,
                onClick: () =>
                    navigate(`/member-report/${report._id}/edit`),
            });
        }

        return actions;
    }

    if (loading && reports.length === 0) {
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
            onNewReport={() => navigate("/member-report")}
            pagination={pagination}
            onPageChange={setPage}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            pageSize={PAGE_SIZE}
            role="member"
        />
    );
}
