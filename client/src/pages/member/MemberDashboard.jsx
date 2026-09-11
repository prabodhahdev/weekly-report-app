import {
    FileText,
    Clock3,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";

const recentReports = [
    {
        id: 1,
        week: "Sep 08 – Sep 14, 2026",
        project: "Weekly Report System",
        status: "Submitted",
    },
    {
        id: 2,
        week: "Sep 01 – Sep 07, 2026",
        project: "Client Portal",
        status: "Approved",
    },
    {
        id: 3,
        week: "Aug 25 – Aug 31, 2026",
        project: "Internal Tooling",
        status: "Needs Correction",
    },
];

const MemberDashboard = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-lg font-medium text-gray-900">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View your weekly reports and recent activity.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Reports
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    8
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Submitted reports
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1b496d]/10 text-[#1b496d]">
                                <FileText size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pending
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    1
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Awaiting submission
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                <Clock3 size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Approved
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    6
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Reports approved
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00df82]/10 text-[#008f5a]">
                                <CheckCircle2 size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Needs Correction
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    1
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Requires your action
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                <AlertTriangle size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Week */}
                <div className="mt-6 rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-900">
                                This Week's Report
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Sep 08 – Sep 14, 2026
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-[#1b496d]/10 px-3 py-1.5 text-xs font-semibold text-[#1b496d]">
                            Submitted
                        </span>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="mt-6 rounded-xl border border-[#dcdddf] bg-white shadow-sm">

                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Recent Reports
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Your latest weekly reports
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#dcdddf] text-left">
                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Week
                                    </th>

                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Project
                                    </th>

                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentReports.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="border-b border-gray-100 last:border-b-0"
                                    >
                                        <td className="px-5 py-4 text-gray-700">
                                            {report.week}
                                        </td>

                                        <td className="px-5 py-4 text-gray-700">
                                            {report.project}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                    report.status === "Approved"
                                                        ? "bg-[#00df82]/10 text-[#008f5a]"
                                                        : report.status ===
                                                          "Needs Correction"
                                                        ? "bg-red-50 text-red-600"
                                                        : "bg-[#1b496d]/10 text-[#1b496d]"
                                                }`}
                                            >
                                                {report.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MemberDashboard;