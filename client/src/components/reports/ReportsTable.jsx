import StatusBanner from "./ReportStatusBadge.jsx";

function formatRange(weekStart, weekEnd) {
  const opts = { month: "short", day: "numeric" };
  const start = new Date(weekStart).toLocaleDateString(undefined, opts);
  const end = new Date(weekEnd).toLocaleDateString(undefined, opts);
  return `${start} – ${end}`;
}

export default function ReportsTable({ reports, showMember, getAction }) {
  if (reports.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-400 italic">
        No reports match these filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-indigo-50/60 text-left text-xs font-medium text-indigo-700">
            {showMember && <th className="p-3">Member</th>}
            <th className="p-3">Week</th>
            <th className="p-3">Project</th>
            <th className="p-3">Status</th>
            <th className="p-3">Last updated</th>
            <th className="p-3 w-28" />
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => {
            const action = getAction(r);
            const Icon = action.icon;
            return (
              <tr key={r.id} className={i % 2 ? "bg-gray-50/50" : "bg-white"}>
                {showMember && (
                  <td className="p-3 font-medium text-gray-900">{r.memberName}</td>
                )}
                <td className="p-3 font-medium text-gray-900">
                  {formatRange(r.weekStart, r.weekEnd)}
                </td>
                <td className="p-3 text-gray-600">{r.project}</td>
                <td className="p-3"><StatusBanner status={r.status} /></td>
                <td className="p-3 text-gray-500">
                  {new Date(r.updatedAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    type="button"
                    onClick={action.onClick}
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    <Icon size={14} />
                    {action.label}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}