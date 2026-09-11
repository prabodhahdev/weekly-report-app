import { useMemo, useState } from "react";
import { History, Plus } from "lucide-react";

import Card from "../ui/Card.jsx";
import ReportsFilterBar from "./ReportsFilterBar.jsx";
import ReportsTable from "./ReportsTable.jsx";

export default function ReportsListPage({
    title,
    description,
    reports,
    showMember = false,
    members,
    getActions,
    onNewReport,
    cardTitle = "Report history",
}) {
    const [filters, setFilters] = useState({
        project: "",
        status: "",
        from: "",
        to: "",
        member: "",
    });

    const filteredReports = useMemo(() => {
        return reports
            .filter((r) => {
                if (filters.project && r.project !== filters.project) {
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
            .sort((a, b) =>
                a.weekStart < b.weekStart ? 1 : -1
            );
    }, [reports, filters]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Page Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <div>
                        <h1 className="text-lg font-semibold text-[#1b496d]">
                            {title}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    </div>

                    {onNewReport && (
                        <button
                            type="button"
                            onClick={onNewReport}
                            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#1b496d] text-white text-sm font-medium hover:bg-[#3c8385] transition-colors shadow-sm"
                        >
                            <Plus size={16} />
                            New report
                        </button>
                    )}
                </div>

                {/* Reports Card */}
                <Card
                    title={cardTitle}
                    icon={History}
                    className="w-full"
                >
                    {/* Filters */}
                    <div className="mb-4">
                        <ReportsFilterBar
                            filters={filters}
                            onChange={setFilters}
                            members={members}
                        />
                    </div>

                    {/* Table */}
                    <ReportsTable
                        reports={filteredReports}
                        showMember={showMember}
                        getActions={getActions}
                    />
                </Card>

            </div>
        </div>
    );
}