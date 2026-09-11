
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FileText,
    Clock3,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";
import apiFetch from "../../api/apiFetch";

const MemberDashboard = () => {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    async function fetchReports() {
        try {
            setLoading(true);

            const response = await apiFetch(
                "/api/reports/my-reports"
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load reports"
                );
            }

            setReports(data.reports || []);

        } catch (error) {
            console.error(
                "Fetch member reports error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load reports"
            );

        } finally {
            setLoading(false);
        }
    }

    const totalReports = reports.length;

    const approvedReports = reports.filter(
        (report) =>
            report.status === "approved"
    ).length;

    const needsCorrectionReports =
        reports.filter(
            (report) =>
                report.status ===
                "needs_correction"
        ).length;

    const pendingReports = reports.filter(
        (report) =>
            report.status === "draft"
    ).length;

    function getCurrentWeek() {
        const today = new Date();

        const day = today.getDay();

        const diff =
            day === 0 ? -6 : 1 - day;

        const weekStart = new Date(today);

        weekStart.setDate(
            today.getDate() + diff
        );

        weekStart.setHours(
            0,
            0,
            0,
            0
        );

        const weekEnd = new Date(
            weekStart
        );

        weekEnd.setDate(
            weekStart.getDate() + 6
        );

        weekEnd.setHours(
            23,
            59,
            59,
            999
        );

        return {
            weekStart,
            weekEnd,
        };
    }

    function formatDate(date) {
        return new Date(
            date
        ).toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    }

    const {
        weekStart,
        weekEnd,
    } = getCurrentWeek();

    const currentWeekReport =
        reports.find((report) => {
            if (!report.weekStart) {
                return false;
            }

            const reportWeekStart =
                new Date(
                    report.weekStart
                );

            reportWeekStart.setHours(
                0,
                0,
                0,
                0
            );

            return (
                reportWeekStart.getTime() ===
                weekStart.getTime()
            );
        });

    const recentReports = [...reports]
        .sort(
            (a, b) =>
                new Date(
                    b.weekStart
                ) -
                new Date(
                    a.weekStart
                )
        )
        .slice(0, 5);

    function getStatusLabel(status) {
        switch (status) {
            case "approved":
                return "Approved";

            case "needs_correction":
                return "Needs Correction";

            case "submitted":
                return "Submitted";

            case "draft":
                return "Draft";

            default:
                return status || "-";
        }
    }

    function getStatusClass(status) {
        switch (status) {
            case "approved":
                return "bg-[#00df82]/10 text-[#008f5a]";

            case "needs_correction":
                return "bg-red-50 text-red-600";

            case "submitted":
                return "bg-[#1b496d]/10 text-[#1b496d]";

            case "draft":
                return "bg-orange-50 text-orange-600";

            default:
                return "bg-gray-100 text-gray-600";
        }
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }

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

                    {/* Total Reports */}
                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Reports
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    {totalReports}
                                </h2>

                                <p className="mt-1 text-xs text-gray-400">
                                    Your weekly reports
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1b496d]/10 text-[#1b496d]">
                                <FileText size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Pending */}
                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pending
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    {pendingReports}
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

                    {/* Approved */}
                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Approved
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    {approvedReports}
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

                    {/* Needs Correction */}
                    <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Needs Correction
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-[#1b496d]">
                                    {needsCorrectionReports}
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
                                {formatDate(weekStart)}
                                {" – "}
                                {formatDate(weekEnd)}
                            </p>
                        </div>

                        {currentWeekReport ? (
                            <span
                                className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                                    currentWeekReport.status
                                )}`}
                            >
                                {getStatusLabel(
                                    currentWeekReport.status
                                )}
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/member-report"
                                    )
                                }
                                className="w-fit rounded-lg bg-[#1b496d] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#153b58]"
                            >
                                Create Report
                            </button>
                        )}

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

                                {recentReports.length > 0 ? (
                                    recentReports.map(
                                        (report) => (
                                            <tr
                                                key={
                                                    report._id
                                                }
                                                className="border-b border-gray-100 last:border-b-0"
                                            >

                                                <td className="px-5 py-4 text-gray-700">
                                                    {formatDate(
                                                        report.weekStart
                                                    )}
                                                    {" – "}
                                                    {formatDate(
                                                        report.weekEnd
                                                    )}
                                                </td>

                                                <td className="px-5 py-4 text-gray-700">
                                                    {report.project?.name ||
                                                        "-"}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                            report.status
                                                        )}`}
                                                    >
                                                        {getStatusLabel(
                                                            report.status
                                                        )}
                                                    </span>
                                                </td>

                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-5 py-10 text-center"
                                        >
                                            <p className="text-sm text-gray-500">
                                                No reports found.
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MemberDashboard;
