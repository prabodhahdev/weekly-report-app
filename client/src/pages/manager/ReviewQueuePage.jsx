
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DUMMY_SUBMITTED_REPORTS = [
    {
        id: "report-1",
        memberName: "John Silva",
        week: "Sep 08 – Sep 14, 2026",
        project: "Weekly Report System",
        submittedAt: "Sep 11, 2026",
    },
    {
        id: "report-5",
        memberName: "Sarah Perera",
        week: "Sep 08 – Sep 14, 2026",
        project: "Client Portal",
        submittedAt: "Sep 11, 2026",
    },
    {
        id: "report-6",
        memberName: "Alex Fernando",
        week: "Sep 08 – Sep 14, 2026",
        project: "Internal Tooling",
        submittedAt: "Sep 10, 2026",
    },
];

const ReviewQueuePage = () => {
    const navigate = useNavigate();

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
                                {DUMMY_SUBMITTED_REPORTS.length > 0 ? (
                                    DUMMY_SUBMITTED_REPORTS.map((report) => (
                                        <tr
                                            key={report.id}
                                            className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-4">
                                                <p className="font-medium text-gray-900">
                                                    {report.memberName}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-gray-700">
                                                {report.week}
                                            </td>

                                            <td className="px-5 py-4 text-gray-700">
                                                {report.project}
                                            </td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {report.submittedAt}
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/manager-report/${report.id}`
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1b496d] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#153b58]"
                                                >
                                                    <Eye size={15} />
                                                    Review
                                                </button>
                                            </td>

                                        </tr>
                                    ))
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


