import { useState } from "react";
import { History, Plus } from "lucide-react";

import Card from "@/components/ui/Card.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import Pagination from "@/components/ui/Pagination.jsx";
import ReportsFilterBar from "./ReportsFilterBar.jsx";
import ReportsTable from "./ReportsTable.jsx";

const EMPTY_FILTERS = {
    project: "",
    status: "",
    from: "",
    to: "",
    member: "",
};

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
    role,
    pagination,
    onPageChange,
    filters: controlledFilters,
    onFiltersChange,
}) {
    const [localFilters, setLocalFilters] = useState(EMPTY_FILTERS);

    const filters = controlledFilters ?? localFilters;
    const isServerPaged = Boolean(pagination && onPageChange);

    function handleFilterChange(next) {
        if (onFiltersChange) {
            onFiltersChange(next);
            return;
        }

        setLocalFilters(next);
    }

    const page = isServerPaged ? pagination.page : 1;
    const totalPages = isServerPaged
        ? pagination.totalPages
        : Math.max(1, Math.ceil(reports.length / pageSize));
    const totalItems = isServerPaged
        ? pagination.total
        : reports.length;
    const currentPageSize = isServerPaged
        ? pagination.limit || pageSize
        : pageSize;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
                <PageHeader
                    title={title}
                    description={description}
                    action={
                        onNewReport ? (
                            <button
                                type="button"
                                onClick={onNewReport}
                                className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#1b496d] cursor-pointer text-white text-sm font-medium hover:bg-[#3c8385] transition-colors shadow-sm"
                            >
                                <Plus size={16} />
                                New report
                            </button>
                        ) : null
                    }
                />

                <Card title={cardTitle} icon={History} className="w-full">
                    <div className="mb-4">
                        <ReportsFilterBar
                            filters={filters}
                            onChange={handleFilterChange}
                            members={members}
                            role={role}
                        />
                    </div>

                    <div className="rounded-lg border border-[#dcdddf] overflow-hidden">
                        <ReportsTable
                            reports={reports}
                            showMember={showMember}
                            getActions={getActions}
                        />

                        <Pagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={onPageChange || (() => {})}
                            totalItems={totalItems}
                            pageSize={currentPageSize}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
