import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReviewQueuePage = () => {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmittedReports();
    }, []);

    async function fetchSubmittedReports() {
        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:8000/api/reports?status=submitted",
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load submitted reports"
                );
            }

            setReports(data.reports || []);

        } catch (error) {
            console.error(
                "Fetch submitted reports error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load submitted reports"
            );

        } finally {
            setLoading(false);
        }
    }

    function formatWeek(
        weekStart,
        weekEnd
    ) {
        const options = {
            month: "short",
            day: "numeric",
            year: "numeric",
        };

        const start = new Date(
            weekStart
        ).toLocaleDateString(
            undefined,
            options
        );

        const end = new Date(
            weekEnd
        ).toLocaleDateString(
            undefined,
            options
        );

        return `${start} – ${end}`;
    }

    function formatSubmittedAt(report) {
        const submittedAt =
            report.currentVersion?.submittedAt;

        if (!submittedAt) {
            return "-";
        }

        return new Date(
            submittedAt
        ).toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading review queue...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-lg font-semibold text-[#1b496d]">
                        Review Queue
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Review weekly reports submitted by team members.
                    </p>
                </div>

                {/* Queue */}
                <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm">

                    {/* Section Header */}
                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Submitted Reports
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            These reports are waiting for your review.
                        </p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">

                            <thead>
                                <tr className="border-b border-[#dcdddf] text-left">

                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Team Member
                                    </th>

                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Week
                                    </th>

                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Project
                                    </th>

                                    <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                        Submitted
                                    </th>

                                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-500">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {reports.length > 0 ? (
                                    reports.map(
                                        (report) => {

                                            const memberName =
                                                typeof report.member === "object"
                                                    ? report.member?.name
                                                    : "-";

                                            const projectName =
                                                typeof report.project === "object"
                                                    ? report.project?.name
                                                    : report.project;

                                            return (
                                                <tr
                                                    key={report._id}
                                                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                                >

                                                    {/* Team Member */}
                                                    <td className="px-5 py-4">
                                                        <p className="font-medium text-gray-900">
                                                            {memberName}
                                                        </p>
                                                    </td>

                                                    {/* Week */}
                                                    <td className="px-5 py-4 text-gray-700">
                                                        {formatWeek(
                                                            report.weekStart,
                                                            report.weekEnd
                                                        )}
                                                    </td>

                                                    {/* Project */}
                                                    <td className="px-5 py-4 text-gray-700">
                                                        {projectName || "-"}
                                                    </td>

                                                    {/* Submitted */}
                                                    <td className="px-5 py-4 text-gray-600">
                                                        {formatSubmittedAt(
                                                            report
                                                        )}
                                                    </td>

                                                    {/* Action */}
                                                    <td className="px-5 py-4 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/manager-report/${report._id}`
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1b496d] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#153b58]"
                                                        >
                                                            <Eye
                                                                size={15}
                                                            />
                                                            Review
                                                        </button>
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-5 py-12 text-center"
                                        >
                                            <p className="text-sm font-medium text-gray-600">
                                                No reports waiting for review.
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                Submitted reports will appear here.
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

export default ReviewQueuePage;