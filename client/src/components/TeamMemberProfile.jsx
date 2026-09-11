import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DUMMY_MEMBERS = {
    "1": {
        name: "John Silva",
        email: "john.silva@gmail.com",
        role: "Member",
        totalReports: 12,
        approved: 8,
        needsCorrection: 2,
        submitted: 1,
        draft: 1,
    },

    "2": {
        name: "Sarah Perera",
        email: "sarah.perera@gmail.com",
        role: "Member",
        totalReports: 9,
        approved: 6,
        needsCorrection: 1,
        submitted: 1,
        draft: 1,
    },

    "3": {
        name: "Alex Fernando",
        email: "alex.fernando@gmail.com",
        role: "Member",
        totalReports: 15,
        approved: 11,
        needsCorrection: 2,
        submitted: 1,
        draft: 1,
    },

    "4": {
        name: "Nimal Perera",
        email: "nimal.perera@gmail.com",
        role: "Member",
        totalReports: 7,
        approved: 5,
        needsCorrection: 1,
        submitted: 1,
        draft: 0,
    },
};

const DUMMY_REPORTS = [
    {
        id: "report-1",
        week: "Sep 08 – Sep 14, 2026",
        project: "Weekly Report System",
        status: "Approved",
    },

    {
        id: "report-2",
        week: "Sep 01 – Sep 07, 2026",
        project: "Weekly Report System",
        status: "Needs Correction",
    },

    {
        id: "report-3",
        week: "Aug 25 – Aug 31, 2026",
        project: "Client Portal",
        status: "Approved",
    },

    {
        id: "report-4",
        week: "Aug 18 – Aug 24, 2026",
        project: "Client Portal",
        status: "Submitted",
    },
];

const TeamMemberProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const member = DUMMY_MEMBERS[id];

    if (!member) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Team member not found.
                </p>
            </div>
        );
    }

    const stats = [
        {
            label: "Total Reports",
            value: member.totalReports,
        },

        {
            label: "Approved",
            value: member.approved,
        },

        {
            label: "Needs Correction",
            value: member.needsCorrection,
        },

        {
            label: "Submitted",
            value: member.submitted,
        },

        {
            label: "Draft",
            value: member.draft,
        },
    ];

    const getStatusClass = (status) => {
        if (status === "Approved") {
            return "bg-[#caf29a]/60 text-[#1b496d]";
        }

        if (status === "Needs Correction") {
            return "bg-red-50 text-red-600";
        }

        if (status === "Submitted") {
            return "bg-blue-50 text-blue-600";
        }

        return "bg-gray-100 text-gray-600";
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Header */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => navigate("/manager-team")}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1b496d]"
                    >
                        <ArrowLeft size={16} />
                        Back to Team Members
                    </button>

                    <h1 className="text-lg font-semibold text-[#1b496d]">
                        {member.name}
                    </h1>

                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <span>{member.email}</span>

                        <span>•</span>

                        <span>{member.role}</span>
                    </div>
                </div>

                {/* Statistics */}
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-[#dcdddf] bg-white p-4 shadow-sm"
                        >
                            <p className="text-xs text-gray-500">
                                {stat.label}
                            </p>

                            <p className="mt-2 text-2xl font-semibold text-[#1b496d]">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Report History */}
                <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm">

                    {/* Section Header */}
                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Report History
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            View this team member's previous weekly reports.
                        </p>
                    </div>

                    {/* Table */}
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

                                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-500">
                                        Action
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {DUMMY_REPORTS.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                    >

                                        {/* Week */}
                                        <td className="px-5 py-4 text-gray-700">
                                            {report.week}
                                        </td>

                                        {/* Project */}
                                        <td className="px-5 py-4 text-gray-700">
                                            {report.project}
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                    report.status
                                                )}`}
                                            >
                                                {report.status}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/manager-report/${report.id}`
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-[#dcdddf] px-3 py-2 text-xs font-medium text-[#1b496d] hover:bg-[#1b496d]/5"
                                            >
                                                <Eye size={15} />
                                                View
                                            </button>
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

export default TeamMemberProfile;
