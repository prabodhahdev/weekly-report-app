import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Calendar,
    FolderKanban,
    ListChecks,
    CalendarClock,
    AlertTriangle,
    Trophy,
    Clock,
    StickyNote,
    FilePenLine,
} from "lucide-react";

import Card from "../components/ui/Card.jsx";
import StatusBanner from "../components/reports/StatusBanner.jsx";
import WeekSelector from "../components/reports/WeekSelector.jsx";
import ProjectSelect from "../components/reports/ProjectSelector.jsx";
import TasksCompletedTable from "../components/reports/TasksCompletedTable.jsx";
import TasksPlannedList from "../components/reports/TaskPlannedList.jsx";
import FlaggableList from "../components/reports/FlaggableList.jsx";
import HoursBreakdown from "../components/reports/HoursBreakDown.jsx";
import NotesSection from "../components/reports/NotesSection.jsx";


function emptyReport() {
    return {
        weekStart: "",
        project: "",
        tasksCompleted: [],
        tasksPlanned: [],
        blockers: [],
        achievements: [],
        hours: {
            development: "",
            testing: "",
            meetings: "",
            documentation: "",
        },
        notes: "",
        status: "draft",
        managerComment: "",
    };
}


export default function WeeklyReportPage({
    initialReport = null,
    editMode = false,
}) {

    const navigate = useNavigate();

    const [report, setReport] = useState(emptyReport());

    const [reportId, setReportId] = useState(
        initialReport?._id || initialReport?.id || null
    );

    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (initialReport) {

            setReport({
                ...emptyReport(),
                ...initialReport,
                hours: {
                    ...emptyReport().hours,
                    ...(initialReport.hours || {}),
                },
            });

            setReportId(
                initialReport._id ||
                initialReport.id ||
                null
            );
        }

    }, [initialReport]);


    const isLocked =
        report.status === "submitted" ||
        report.status === "approved";


    function updateField(field, value) {

        setReport((prev) => ({
            ...prev,
            [field]: value,
        }));
    }


    function getReportData() {

        return {
            weekStart: report.weekStart,
            project: report.project,
            tasksCompleted: report.tasksCompleted,
            tasksPlanned: report.tasksPlanned,
            blockers: report.blockers,
            achievements: report.achievements,
            hours: report.hours,
            notes: report.notes,
        };
    }


    // Create a new report
    async function createNewReport() {

        const response = await fetch(
            "http://localhost:8000/api/reports",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(getReportData()),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to create report"
            );
        }

        setReportId(data.report._id);

        setReport((prev) => ({
            ...prev,
            status: data.report.status,
            managerComment:
                data.version?.managerComment || "",
        }));

        return data;
    }


    // Update an existing report
    async function updateExistingReport() {

        const response = await fetch(
            `http://localhost:8000/api/reports/${reportId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(getReportData()),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to update report"
            );
        }

        setReport((prev) => ({
            ...prev,
            status: data.report.status,
            managerComment:
                data.version?.managerComment || "",
        }));

        return data;
    }


    // Save draft
   async function handleSaveDraft() {

    if (!report.weekStart || !report.project) {
        toast.error(
            "Select a week and a project before saving"
        );
        return;
    }

    try {

        setLoading(true);

        if (reportId) {

            await updateExistingReport();

            toast.success(
                "Report updated successfully"
            );

        } else {

            await createNewReport();

            toast.success(
                "Draft saved successfully"
            );
        }

        navigate("/member-reports");

    } catch (error) {

        console.error(
            "Save report error:",
            error
        );

        toast.error(
            error.message ||
            "Failed to save report"
        );

    } finally {

        setLoading(false);

    }
}


    // Submit report
    async function handleSubmit() {

        if (!report.weekStart || !report.project) {
            toast.error(
                "Select a week and a project before submitting"
            );
            return;
        }

        try {

            setLoading(true);

            /*
             * If there is no report yet,
             * create the draft first.
             */
            if (!reportId) {

                const data = await createNewReport();

                const newReportId = data.report._id;

                const response = await fetch(
                    `http://localhost:8000/api/reports/${newReportId}/submit`,
                    {
                        method: "PUT",
                        credentials: "include",
                    }
                );

                const submitData =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        submitData.message ||
                        "Failed to submit report"
                    );
                }

                toast.success(
                    "Report submitted for review"
                );

                navigate("/member-reports");

                return;
            }


            /*
             * Update the existing report first.
             */
            await updateExistingReport();


            /*
             * Then submit it.
             */
            const response = await fetch(
                `http://localhost:8000/api/reports/${reportId}/submit`,
                {
                    method: "PUT",
                    credentials: "include",
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to submit report"
                );
            }


            const isResubmitting =
                report.status === "needs_correction";


            toast.success(
                isResubmitting
                    ? "Report resubmitted for review"
                    : "Report submitted for review"
            );


            /*
             * Redirect after successful submission.
             */
            navigate("/member-reports");


        } catch (error) {

            console.error(
                "Submit report error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to submit report"
            );

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="w-full h-full flex flex-col">

            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Header */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-800 via-indigo-700 to-indigo-800 p-6 mb-5 w-full shadow-sm">

                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
                        aria-hidden="true"
                    />

                    <div
                        className="absolute -bottom-16 right-24 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"
                        aria-hidden="true"
                    />

                    <div className="relative flex items-start gap-4">

                        <div className="hidden sm:flex w-11 h-11 rounded-lg bg-white/15 items-center justify-center shrink-0">

                            <FilePenLine
                                size={20}
                                className="text-white"
                                aria-hidden="true"
                            />

                        </div>

                        <div>

                            <h1 className="text-lg font-semibold text-white">

                                {editMode
                                    ? "Edit Weekly Report"
                                    : "My Weekly Report"}

                            </h1>

                            <p className="text-sm text-indigo-100">

                                Fields and order are fixed for the whole team so reports stay comparable.

                            </p>

                            <div className="mt-3">

                                <StatusBanner
                                    status={report.status}
                                    managerComment={
                                        report.managerComment
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Week + Project */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">

                    <Card
                        title="Week"
                        icon={Calendar}
                    >

                        <WeekSelector
                            weekStart={report.weekStart}
                            onChange={(v) =>
                                updateField(
                                    "weekStart",
                                    v
                                )
                            }
                            disabled={isLocked || loading}
                        />

                    </Card>


                    <Card
                        title="Project / category"
                        icon={FolderKanban}
                    >

                        <ProjectSelect
                            value={report.project}
                            onChange={(v) =>
                                updateField(
                                    "project",
                                    v
                                )
                            }
                            disabled={isLocked || loading}
                        />

                    </Card>

                </div>


                {/* Tasks completed */}
                <Card
                    title="Tasks completed"
                    icon={ListChecks}
                    className="mt-5 w-full"
                >

                    <TasksCompletedTable
                        tasks={report.tasksCompleted}
                        onChange={(v) =>
                            updateField(
                                "tasksCompleted",
                                v
                            )
                        }
                        disabled={isLocked || loading}
                    />

                </Card>


                {/* Tasks planned */}
                <Card
                    title="Tasks planned for next week"
                    icon={CalendarClock}
                    className="mt-5 w-full"
                >

                    <TasksPlannedList
                        items={report.tasksPlanned}
                        onChange={(v) =>
                            updateField(
                                "tasksPlanned",
                                v
                            )
                        }
                        disabled={isLocked || loading}
                    />

                </Card>


                {/* Blockers + Achievements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 w-full">

                    <Card
                        title="Blockers / challenges"
                        icon={AlertTriangle}
                    >

                        <FlaggableList
                            items={report.blockers}
                            onChange={(v) =>
                                updateField(
                                    "blockers",
                                    v
                                )
                            }
                            disabled={isLocked || loading}
                            flagLabel="Key issue"
                            placeholder="Describe a blocker"
                        />

                    </Card>


                    <Card
                        title="Achievements / highlights"
                        icon={Trophy}
                    >

                        <FlaggableList
                            items={report.achievements}
                            onChange={(v) =>
                                updateField(
                                    "achievements",
                                    v
                                )
                            }
                            disabled={isLocked || loading}
                            flagLabel="Highlight"
                            placeholder="Describe an achievement"
                        />

                    </Card>

                </div>


                {/* Hours */}
                <Card
                    title="Hours by task type"
                    icon={Clock}
                    description="Optional"
                    className="mt-5 w-full"
                >

                    <HoursBreakdown
                        hours={report.hours}
                        onChange={(v) =>
                            updateField(
                                "hours",
                                v
                            )
                        }
                        disabled={isLocked || loading}
                    />

                </Card>


                {/* Notes */}
                <Card
                    title="Notes"
                    icon={StickyNote}
                    description="Optional — links or extra context"
                    className="mt-5 w-full"
                >

                    <NotesSection
                        value={report.notes}
                        onChange={(v) =>
                            updateField(
                                "notes",
                                v
                            )
                        }
                        disabled={isLocked || loading}
                    />

                </Card>


                {/* Actions */}
                {!isLocked && (

                    <div className="flex gap-3 mt-5 mb-6">

                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={loading}
                            className="h-10 px-4 cursor-pointer rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Saving..."
                                : editMode
                                    ? "Save changes"
                                    : "Save draft"}

                        </button>


                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="h-10 px-4 cursor-pointer rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >

                            {loading
                                ? "Submitting..."
                                : report.status ===
                                    "needs_correction"
                                    ? "Resubmit for review"
                                    : "Submit for review"}

                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}