import ReportHeader from "./ReportHeader";
import ReportStatistics from "./ReportStatistics";
import WeeklyHighlights from "./WeeklyHighlights";
import CompletedTasks from "./CompletedTasks";
import NextWeekTasks from "./NextWeekTasks";
import BlockersSection from "./BlockersSection";
import ChallengesSection from "./ChallengesSection";
import HoursBreakdown from "./HoursBreakdown";
import NotesSection from "./NotesSection";
import ManagerFeedback from "./ManagerFeedback";

const ViewReport = ({ report }) => {
    if (!report) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                No report data available.
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <ReportHeader report={report} />

            <ReportStatistics report={report} />

            <WeeklyHighlights
                highlights={report.highlights || []}
            />

            <CompletedTasks
                tasks={report.completedTasks || []}
            />

            <NextWeekTasks
                tasks={report.nextWeekTasks || []}
            />

            <BlockersSection
                blockers={report.blockers || []}
            />

            <ChallengesSection
                challenges={report.challenges || []}
            />

            <HoursBreakdown
                hours={report.hoursBreakdown || []}
            />

            <NotesSection
                notes={report.notes}
            />

            <ManagerFeedback
                feedback={report.managerFeedback}
            />
        </div>
    );
};

export default ViewReport;