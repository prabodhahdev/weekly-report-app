import { useMemo, useState } from "react";
import { History, Plus } from "lucide-react";

import Card from "../ui/Card.jsx";
import ReportsFilterBar from "./ReportsFilterBar.jsx";
import ReportsTable from "./ReportsTable.jsx";
import Pagination from "../ui/Pagination.jsx";

export default function ReportsListPage({
    title,
    description,
    reports,
    showMember = false,
    members,
    getActions,
    onNewReport,
    cardTitle = "Report history",
    pageSize = 6,
    role
}) {
    const [filters, setFilters] = useState({
        project: "",
        status: "",
        from: "",
        to: "",
        member: "",
    });

    const [page, setPage] = useState(1);

    const filteredReports = useMemo(() => {
        return reports
            .filter((r) => {
                const projectId =
                    typeof r.project === "object" ? r.project?._id : r.project;

                if (filters.project && projectId !== filters.project) {
                    return false;
                }

                if (filters.status && r.status !== filters.status) {
                    return false;
                }

                if (filters.from && r.weekStart < filters.from) {
                    return false;
                }

                if (filters.to && r.weekEnd > filters.to) {
                    return false;
                }

                if (filters.member && r.memberName !== filters.member) {
                    return false;
                }

                return true;
            })
            .sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1));
    }, [reports, filters]);

    const totalPages = Math.max(1, Math.ceil(filteredReports.length / pageSize));

    const pagedReports = filteredReports.slice(
        (page - 1) * pageSize,
        page * pageSize,
    );

    function handleFilterChange(next) {
        setFilters(next);
        setPage(1); // reset to page 1 whenever filters change
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
                {/* Page Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <div>
                        <h1 className="text-lg font-semibold text-[#1b496d]">{title}</h1>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>

                    {onNewReport && (
                        <button
                            type="button"
                            onClick={onNewReport}
                            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#1b496d] cursor-pointer text-white text-sm font-medium hover:bg-[#3c8385] transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                            New report
                        </button>
                    )}
                </div>

                {/* Reports Card */}
                <Card title={cardTitle} icon={History} className="w-full">
                    {/* Filters */}
                    <div className="mb-4">
                        <ReportsFilterBar
                            filters={filters}
                            onChange={handleFilterChange}
                            members={members}
                            role={role}
                        />
                    </div>

                    {/* Table + pagination */}
                    <div className="rounded-lg border border-[#dcdddf] overflow-hidden">
                        <ReportsTable
                            reports={pagedReports}
                            showMember={showMember}
                            getActions={getActions}
                        />

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                            totalItems={filteredReports.length}
                            pageSize={pageSize}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
