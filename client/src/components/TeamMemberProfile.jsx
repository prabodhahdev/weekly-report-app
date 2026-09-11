import { ArrowLeft, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const TeamMemberProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [member, setMember] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMemberData();
    }, [id]);

    async function fetchMemberData() {
        try {
            setLoading(true);

            // Fetch users
            const usersResponse = await fetch(
                "http://localhost:8000/api/auth/users",
                {
                    credentials: "include",
                }
            );

            const usersData =
                await usersResponse.json();

            if (!usersResponse.ok) {
                throw new Error(
                    usersData.message ||
                    "Failed to load team member"
                );
            }

            const selectedMember =
                (usersData.users || []).find(
                    (user) => user._id === id
                );

            if (!selectedMember) {
                throw new Error(
                    "Team member not found"
                );
            }

            setMember(selectedMember);

            // Fetch this member's reports
            const reportsResponse = await fetch(
                `http://localhost:8000/api/reports?member=${id}`,
                {
                    credentials: "include",
                }
            );

            const reportsData =
                await reportsResponse.json();

            if (!reportsResponse.ok) {
                throw new Error(
                    reportsData.message ||
                    "Failed to load reports"
                );
            }

            setReports(
                reportsData.reports || []
            );

        } catch (error) {
            console.error(
                "Fetch team member profile error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load team member"
            );

            navigate("/manager-team");

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading team member...
                </p>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Team member not found.
                </p>
            </div>
        );
    }

    const totalReports = reports.length;

    const approved = reports.filter(
        (report) =>
            report.status === "approved"
    ).length;

    const needsCorrection = reports.filter(
        (report) =>
            report.status === "needs_correction"
    ).length;

    const submitted = reports.filter(
        (report) =>
            report.status === "submitted"
    ).length;

    const draft = reports.filter(
        (report) =>
            report.status === "draft"
    ).length;

    const stats = [
        {
            label: "Total Reports",
            value: totalReports,
        },
        {
            label: "Approved",
            value: approved,
        },
        {
            label: "Needs Correction",
            value: needsCorrection,
        },
        {
            label: "Submitted",
            value: submitted,
        },
        {
            label: "Draft",
            value: draft,
        },
    ];

    const getStatusLabel = (status) => {
        if (status === "needs_correction") {
            return "Needs Correction";
        }

        if (status === "approved") {
            return "Approved";
        }

        if (status === "submitted") {
            return "Submitted";
        }

        if (status === "draft") {
            return "Draft";
        }

        return status;
    };

    const getStatusClass = (status) => {
        if (status === "approved") {
            return "bg-[#caf29a]/60 text-[#1b496d]";
        }

        if (status === "needs_correction") {
            return "bg-red-50 text-red-600";
        }

        if (status === "submitted") {
            return "bg-blue-50 text-blue-600";
        }

        return "bg-gray-100 text-gray-600";
    };

    const formatWeek = (
        weekStart,
        weekEnd
    ) => {
        const options = {
            month: "short",
            day: "numeric",
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
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Header */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/manager-team"
                            )
                        }
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1b496d]"
                    >
                        <ArrowLeft size={16} />
                        Back to Team Members
                    </button>

                    <h1 className="text-lg font-semibold text-[#1b496d]">
                        {member.name}
                    </h1>

                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <span>
                            {member.email}
                        </span>

                        <span>•</span>

                        <span>
                            {member.role}
                        </span>
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
                                {reports.length > 0 ? (
                                    reports.map(
                                        (report) => {

                                            const projectName =
                                                typeof report.project === "object"
                                                    ? report.project?.name
                                                    : report.project;

                                            return (
                                                <tr
                                                    key={report._id}
                                                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                                >

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

                                                    {/* Status */}
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                                report.status
                                                            )}`}
                                                        >
                                                            {getStatusLabel(
                                                                report.status
                                                            )}
                                                        </span>
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
                                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#dcdddf] px-3 py-2 text-xs font-medium text-[#1b496d] hover:bg-[#1b496d]/5"
                                                        >
                                                            <Eye
                                                                size={15}
                                                            />
                                                            View
                                                        </button>
                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-5 py-10 text-center text-sm text-gray-500"
                                        >
                                            No reports found for this team member.
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

export default TeamMemberProfile;