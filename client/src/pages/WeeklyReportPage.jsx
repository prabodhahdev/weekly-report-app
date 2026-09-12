import {
  Calendar,
  FolderKanban,
  ListChecks,
  CalendarClock,
  AlertTriangle,
  Trophy,
  Clock,
  StickyNote,
} from "lucide-react";

import Card from "@/components/ui/Card.jsx";
import WeeklyReportHeader from "@/components/reports/form/WeeklyReportHeader.jsx";
import WeekSelector from "@/components/reports/form/WeekSelector.jsx";
import ProjectSelect from "@/components/reports/form/ProjectSelector.jsx";
import TasksCompletedTable from "@/components/reports/form/TasksCompletedTable.jsx";
import TasksPlannedList from "@/components/reports/form/TaskPlannedList.jsx";
import FlaggableList from "@/components/reports/form/FlaggableList.jsx";
import HoursBreakdown from "@/components/reports/form/HoursBreakdown.jsx";
import NotesSection from "@/components/reports/form/NotesSection.jsx";
import ReportFormActions from "@/components/reports/form/ReportFormActions.jsx";
import { useWeeklyReport } from "@/hooks/useWeeklyReport.js";

export default function WeeklyReportPage({ initialReport = null, editMode = false }) {
  const { report, isLocked, loading, updateField, handleSaveDraft, handleSubmit } =
    useWeeklyReport(initialReport);

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8">
        <WeeklyReportHeader
          editMode={editMode}
          status={report.status}
          managerComment={report.managerComment}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
          <Card title="Week" icon={Calendar}>
            <WeekSelector
              weekStart={report.weekStart}
              onChange={(v) => updateField("weekStart", v)}
              disabled={isLocked || loading}
            />
          </Card>

          <Card title="Project / category" icon={FolderKanban}>
            <ProjectSelect
              value={report.project}
              onChange={(v) => updateField("project", v)}
              disabled={isLocked || loading}
            />
          </Card>
        </div>

        <Card title="Tasks completed" icon={ListChecks} className="mt-5 w-full">
          <TasksCompletedTable
            tasks={report.tasksCompleted}
            onChange={(v) => updateField("tasksCompleted", v)}
            disabled={isLocked || loading}
          />
        </Card>

        <Card title="Tasks planned for next week" icon={CalendarClock} className="mt-5 w-full">
          <TasksPlannedList
            items={report.tasksPlanned}
            onChange={(v) => updateField("tasksPlanned", v)}
            disabled={isLocked || loading}
          />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 w-full">
          <Card title="Blockers / challenges" icon={AlertTriangle}>
            <FlaggableList
              items={report.blockers}
              onChange={(v) => updateField("blockers", v)}
              disabled={isLocked || loading}
              flagLabel="Key issue"
              placeholder="Describe a blocker"
            />
          </Card>

          <Card title="Achievements / highlights" icon={Trophy}>
            <FlaggableList
              items={report.achievements}
              onChange={(v) => updateField("achievements", v)}
              disabled={isLocked || loading}
              flagLabel="Highlight"
              placeholder="Describe an achievement"
            />
          </Card>
        </div>

        <Card title="Hours by task type" icon={Clock} description="Optional" className="mt-5 w-full">
          <HoursBreakdown
            hours={report.hours}
            onChange={(v) => updateField("hours", v)}
            disabled={isLocked || loading}
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
            disabled={isLocked || loading}
          />
        </Card>

        {!isLocked && (
          <ReportFormActions
            loading={loading}
            isResubmitting={report.status === "needs_correction"}
            editMode={editMode}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}