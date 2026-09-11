import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";

import WeeklyReportPage from "../WeeklyReportPage.jsx";

export default function EditMyReportPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [id]);

    async function fetchReport() {
        try {
            const response = await fetch(
                `http://localhost:8000/api/reports/my-reports/${id}`,
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load report"
                );
            }

            const currentVersion =
                data.report.currentVersion;

            if (!currentVersion) {
                throw new Error(
                    "Current report version not found"
                );
            }

            setReport({
                id: data.report._id,

                weekStart: currentVersion.weekStart
                    ? new Date(
                          currentVersion.weekStart
                      )
                          .toISOString()
                          .split("T")[0]
                    : "",

                project:
                    typeof currentVersion.project === "object"
                        ? currentVersion.project._id
                        : currentVersion.project,

                tasksCompleted: (
                    currentVersion.tasksCompleted || []
                ).map((task) => ({
                    ...task,
                    id: task._id,
                })),

                tasksPlanned: (
                    currentVersion.tasksPlanned || []
                ).map((task) => ({
                    ...task,
                    id: task._id,
                })),

                blockers: (
                    currentVersion.blockers || []
                ).map((item) => ({
                    ...item,
                    id: item._id,
                })),

                achievements: (
                    currentVersion.achievements || []
                ).map((item) => ({
                    ...item,
                    id: item._id,
                })),

                hours: currentVersion.hours || {
                    development: 0,
                    testing: 0,
                    meetings: 0,
                    documentation: 0,
                },

                notes: currentVersion.notes || "",

                status: data.report.status,

                managerComment:
                    currentVersion.managerComment || "",
            });

        } catch (error) {
            console.error(
                "Fetch report error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load report"
            );

            navigate("/member-reports");

        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Loading report...
            </div>
        );
    }

    if (!report) {
        return null;
    }

    return (
        <div className="w-full h-full flex flex-col">

            <div className="flex-1 overflow-y-auto">

                {/* View shortcut */}
                <div className="px-4 sm:px-8 pt-5">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/member-report/${id}`
                            )
                        }
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        <Eye size={16} />
                        View report
                    </button>

                </div>

                <WeeklyReportPage
                    initialReport={report}
                    editMode={true}
                />

            </div>

        </div>
    );
}