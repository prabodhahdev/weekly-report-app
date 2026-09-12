import ReportStatusBadge from "./ReportStatusBadge.jsx";
import ReportActionsMenu from "./ReportsActionsMenu.jsx";

function formatRange(weekStart, weekEnd) {
  const opts = { month: "short", day: "numeric" };
  const start = new Date(weekStart).toLocaleDateString(undefined, opts);
  const end = new Date(weekEnd).toLocaleDateString(undefined, opts);
  return `${start} – ${end}`;
}

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function ReportsTable({ reports, showMember, getActions }) {
  if (reports.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-[#9ca3af] italic">
        No reports match these filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f2f2f2] text-left text-xs font-semibold text-[#1b496d] uppercase tracking-wide">
            {showMember && <th className="p-3">Member</th>}
            <th className="p-3">Week</th>
            <th className="p-3">Project</th>
            <th className="p-3">Status</th>
            <th className="p-3">Last updated</th>
            <th className="p-3 w-16 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((r, i) => {
            const reportId = r._id || r.id;
            const projectName =
              typeof r.project === "object" ? r.project?.name : r.project;
            const memberName =
              typeof r.member === "object" ? r.member?.name : r.memberName;

            return (
              <tr
                key={reportId}
                className={`border-t border-[#f2f2f2] hover:bg-[#f2f2f2]/50 transition-colors ${
                  i % 2 ? "bg-white" : "bg-[#f2f2f2]/20"
                }`}
              >
                {showMember && (
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1b496d]/10 text-[10px] font-semibold text-[#1b496d]">
                        {initials(memberName) || "-"}
                      </div>
                      <span className="font-medium text-[#6b7280]">
                        {memberName || "-"}
                      </span>
                    </div>
                  </td>
                )}

                <td className="p-3  text-[#6b7280]">
                  {formatRange(r.weekStart, r.weekEnd)}
                </td>
                <td className="p-3 text-[#6b7280]">{projectName || "-"}</td>
                <td className="p-3">
                  <ReportStatusBadge status={r.status} />
                </td>
                <td className="p-3 text-[#9ca3af]">
                  {r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : "-"}
                </td>
                <td className="p-3">
                  <ReportActionsMenu actions={getActions(r)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}