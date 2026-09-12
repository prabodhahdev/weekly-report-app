import { CalendarDays } from "lucide-react";
import ReportStatusBadge from "../reports/ReportStatusBadge.jsx";

export default function CurrentWeekCard({ weekStart, weekEnd, report, onCreateReport, formatDate }) {
  return (
    <div className="mt-6 rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3d8086]/10 text-[#3d8086] shrink-0">
            <CalendarDays size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1b496d]">This Week's Report</h2>
            <p className="mt-0.5 text-xs text-[#9ca3af]">
              {formatDate(weekStart)} – {formatDate(weekEnd)}
            </p>
          </div>
        </div>

        {report ? (
          <ReportStatusBadge status={report.status} className="w-fit px-3 py-1.5" />
        ) : (
          <button
            type="button"
            onClick={onCreateReport}
            className="w-fit rounded-lg bg-[#1b496d] px-4 py-2 text-sm cursor-pointer font-semibold text-white transition hover:bg-[#153b58]"
          >
            Create Report
          </button>
        )}
      </div>
    </div>
  );
}