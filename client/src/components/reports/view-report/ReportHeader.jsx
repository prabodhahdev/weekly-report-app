import {
    CalendarDays,
    FolderKanban,
    UserRound,
} from "lucide-react";

const ReportHeader = ({ report }) => {
    const projectName =
        typeof report.project === "object"
            ? report.project?.name
            : report.project;

    const memberName =
        typeof report.member === "object"
            ? report.member?.name
            : report.memberName;

    function formatStatus(status) {
        if (status === "needs_correction") {
            return "Needs Correction";
        }

        if (status === "submitted") {
            return "Submitted";
        }

        if (status === "approved") {
            return "Approved";
        }

        if (status === "draft") {
            return "Draft";
        }

        return status || "Draft";
    }

    function getStatusClass(status) {
        if (status === "approved") {
            return "bg-[#00df82]/15 text-[#00df82]";
        }

        if (status === "needs_correction") {
            return "bg-red-500/15 text-red-400";
        }

        if (status === "submitted") {
            return "bg-blue-500/15 text-blue-300";
        }

        return "bg-white/10 text-white";
    }

    const startDate = report.weekStart
        ? new Date(report.weekStart).toLocaleDateString(
              undefined,
              {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              }
          )
        : report.startDate;

    const endDate = report.weekEnd
        ? new Date(report.weekEnd).toLocaleDateString(
              undefined,
              {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
              }
          )
        : report.endDate;

    return (
        <div className="border-b border-slate-200">

            {/* Top Header */}
            <div className="bg-[#010a1f] px-6 py-6 text-white">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="mb-1 text-sm font-medium uppercase tracking-wider text-[#00df82]">
                            Weekly Project Status Report
                        </p>

                        <h1 className="text-2xl font-bold">
                            {projectName ||
                                "Weekly Report"}
                        </h1>

                    </div>

                    {/* Status */}
                    <span
                        className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                            report.status
                        )}`}
                    >
                        {formatStatus(
                            report.status
                        )}
                    </span>

                </div>

            </div>

            {/* Report Information */}
            <div className="grid grid-cols-1 gap-4 bg-white px-6 py-5 sm:grid-cols-3">

                {/* Member */}
                <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#010a1f]/5 text-[#010a1f]">
                        <UserRound size={19} />
                    </div>

                    <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Member
                        </p>

                        <p className="mt-1 font-semibold text-[#010a1f]">
                            {memberName ||
                                "Unknown Member"}
                        </p>

                    </div>

                </div>

                {/* Project */}
                <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00df82]/10 text-[#00a968]">
                        <FolderKanban size={19} />
                    </div>

                    <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Project
                        </p>

                        <p className="mt-1 font-semibold text-[#010a1f]">
                            {projectName ||
                                "No Project"}
                        </p>

                    </div>

                </div>

                {/* Period */}
                <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#010a1f]/5 text-[#010a1f]">
                        <CalendarDays size={19} />
                    </div>

                    <div>

                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Period
                        </p>

                        <p className="mt-1 font-semibold text-[#010a1f]">
                            {startDate && endDate
                                ? `${startDate} – ${endDate}`
                                : "No date range"}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ReportHeader;