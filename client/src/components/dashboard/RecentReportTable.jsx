import ReportStatusBadge from "@/components/reports/list/ReportStatusBadge.jsx";

export default function RecentReportsTable({ reports, formatDate }) {
  return (
    <div className="mt-6 rounded-xl border border-[#dcdddf] bg-white shadow-sm overflow-hidden">
      <div className="border-b border-[#dcdddf] px-5 py-4">
        <h2 className="text-lg font-semibold text-[#1b496d]">Recent Reports</h2>
        <p className="mt-0.5 text-sm text-[#9ca3af]">Your latest weekly reports</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f2f2f2] text-left">
              <th className="px-5 py-3 text-md font-semibold text-[#3c8588]">Week</th>
              <th className="px-5 py-3 text-md font-semibold text-[#3c8588]">Project</th>
              <th className="px-5 py-3 text-md sm:text-md font-semibold text-[#3c8588]">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report, i) => (
                <tr
                  key={report._id}
                  className={`border-t border-[#f2f2f2] hover:bg-[#f2f2f2]/60 transition-colors ${
                    i % 2 ? "bg-white" : "bg-[#f2f2f2]/20"
                  }`}
                >
                  <td className="px-5 py-4 text-[#656e79]/80 font-medium">
                    {formatDate(report.weekStart)} – {formatDate(report.weekEnd)}
                  </td>
                  <td className="px-5 py-4 text-[#5a5f66]">{report.project?.name || "-"}</td>
                  <td className="px-5 py-4">
                    <ReportStatusBadge status={report.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-5 py-10 text-center">
                  <p className="text-sm text-[#9ca3af]">No reports found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}