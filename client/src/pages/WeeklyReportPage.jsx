
import { useState } from "react";
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
        hours: { development: "", testing: "", meetings: "", documentation: "" },
        notes: "",
        status: "draft",
        managerComment: "",
    };
}

export default function MyReport() {
    const [report, setReport] = useState(emptyReport);
    const isLocked = report.status === "submitted" || report.status === "approved";

    function updateField(field, value) {
        setReport((prev) => ({ ...prev, [field]: value }));
    }

    async function handleSaveDraft() {
        setReport((prev) => ({ ...prev, status: "draft" }));
        toast.success("Draft saved");
    }

    async function handleSubmit() {
        if (!report.weekStart || !report.project) {
            toast.error("Select a week and a project before submitting");
            return;
        }
        setReport((prev) => ({ ...prev, status: "submitted" }));
        toast.success("Report submitted for review");
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 via-indigo-400 to-indigo-400 p-6 mb-5 w-full shadow-sm">
                    {/* Decorative background accents */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
                    <div className="absolute -bottom-16 right-24 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl" aria-hidden="true" />

                    <div className="relative flex items-start gap-4">
                        <div className="hidden sm:flex w-11 h-11 rounded-lg bg-white/15 items-center justify-center shrink-0">
                            <FilePenLine size={20} className="text-white" aria-hidden="true" />
                        </div>

                        <div>
                            <h1 className="text-lg font-semibold text-white">My Weekly Report</h1>
                            <p className="text-sm text-indigo-100">
                                Fields and order are fixed for the whole team so reports stay comparable.
                            </p>
                            <div className="mt-3">
                                <StatusBanner status={report.status} managerComment={report.managerComment} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
                    <Card title="Week" icon={Calendar}>
                        <WeekSelector
                            weekStart={report.weekStart}
                            onChange={(v) => updateField("weekStart", v)}
                            disabled={isLocked}
                        />
                    </Card>

                    <Card title="Project / category" icon={FolderKanban}>
                        <ProjectSelect
                            value={report.project}
                            onChange={(v) => updateField("project", v)}
                            disabled={isLocked}
                        />
                    </Card>
                </div>

                <Card title="Tasks completed" icon={ListChecks} className="mt-5 w-full">
                    <TasksCompletedTable
                        tasks={report.tasksCompleted}
                        onChange={(v) => updateField("tasksCompleted", v)}
                        disabled={isLocked}
                    />
                </Card>

                <Card title="Tasks planned for next week" icon={CalendarClock} className="mt-5 w-full">
                    <TasksPlannedList
                        items={report.tasksPlanned}
                        onChange={(v) => updateField("tasksPlanned", v)}
                        disabled={isLocked}
                    />
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 w-full">
                    <Card title="Blockers / challenges" icon={AlertTriangle}>
                        <FlaggableList
                            items={report.blockers}
                            onChange={(v) => updateField("blockers", v)}
                            disabled={isLocked}
                            flagLabel="Key issue"
                            placeholder="Describe a blocker"
                        />
                    </Card>

                    <Card title="Achievements / highlights" icon={Trophy}>
                        <FlaggableList
                            items={report.achievements}
                            onChange={(v) => updateField("achievements", v)}
                            disabled={isLocked}
                            flagLabel="Highlight"
                            placeholder="Describe an achievement"
                        />
                    </Card>
                </div>

                <Card title="Hours by task type" icon={Clock} description="Optional" className="mt-5 w-full">
                    <HoursBreakdown
                        hours={report.hours}
                        onChange={(v) => updateField("hours", v)}
                        disabled={isLocked}
                    />
                </Card>

                <Card
                    title="Notes"
                    icon={StickyNote}
                    description="Optional — links or extra context"
                    className="mt-5 w-full"
                >
                    <NotesSection
                        value={report.notes}
                        onChange={(v) => updateField("notes", v)}
                        disabled={isLocked}
                    />
                </Card>

                {!isLocked && (
                    <div className="flex gap-3 mt-5 mb-6">
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className="h-10 px-4 cursor-pointer rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Save draft
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="h-10 px-4 cursor-pointer rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Submit for review
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}