import { CalendarDays, FolderKanban, UserRound } from "lucide-react";
import ReportStatusBadge from "@/components/reports/list/ReportStatusBadge";

const ReportHeader = ({ report }) => {
  const projectName =
    typeof report.project === "object" ? report.project?.name : report.project;

  const memberName =
    typeof report.member === "object" ? report.member?.name : report.memberName;

  const startDate = report.weekStart
    ? new Date(report.weekStart).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : report.startDate;

  const endDate = report.weekEnd
    ? new Date(report.weekEnd).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : report.endDate;

  return (
    <div className="border-b border-[#dcdddf]">
      {/* Top Header */}
      <div className="bg-[#1b496d] px-6 py-6 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[#caf19c]">
              Weekly Project Status Report
            </p>
            <h1 className="text-2xl font-bold">{projectName || "Weekly Report"}</h1>
          </div>

          <ReportStatusBadge
            status={report.status}
            className="w-fit px-4 py-2 text-sm"
          />
        </div>
      </div>

      {/* Report Information */}
      <div className="grid grid-cols-1 gap-4 bg-white px-6 py-5 sm:grid-cols-3">
        {/* Member */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f2f2] text-[#1b496d]">
            <UserRound size={19} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
              Member
            </p>
            <p className="mt-1 font-semibold text-[#1b3040]">
              {memberName || "Unknown Member"}
            </p>
          </div>
        </div>

        {/* Project */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#3d8086]/10 text-[#3d8086]">
            <FolderKanban size={19} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
              Project
            </p>
            <p className="mt-1 font-semibold text-[#1b3040]">
              {projectName || "No Project"}
            </p>
          </div>
        </div>

        {/* Period */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f2f2] text-[#1b496d]">
            <CalendarDays size={19} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#9ca3af]">
              Period
            </p>
            <p className="mt-1 font-semibold text-[#1b3040]">
              {startDate && endDate ? `${startDate} – ${endDate}` : "No date range"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;