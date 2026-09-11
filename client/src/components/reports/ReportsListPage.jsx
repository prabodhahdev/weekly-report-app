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
  getAction,
  onNewReport,
}) {
  const [filters, setFilters] = useState({ project: "", status: "", from: "", to: "", member: "" });

  const filteredReports = useMemo(() => {
    return reports
      .filter((r) => {
        if (filters.project && r.project !== filters.project) return false;
        if (filters.status && r.status !== filters.status) return false;
        if (filters.from && r.weekStart < filters.from) return false;
        if (filters.to && r.weekEnd > filters.to) return false;
        if (filters.member && r.memberName !== filters.member) return false;
        return true;
      })
      .sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1));
  }, [reports, filters]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          {onNewReport && (
            <button
              type="button"
              onClick={onNewReport}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus size={16} /> New report
            </button>
          )}
        </div>

        <Card title="Report history" icon={History} className="w-full">
          <div className="mb-4">
            <ReportsFilterBar filters={filters} onChange={setFilters} members={members} />
          </div>
          <ReportsTable reports={filteredReports} showMember={showMember} getAction={getAction} />
        </Card>
      </div>
    </div>
  );
}