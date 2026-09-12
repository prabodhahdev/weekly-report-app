import {
    ListChecks,
    CalendarClock,
    AlertTriangle,
    Clock,
} from "lucide-react";

const ReportStatistics = ({ report }) => {
    const completedTasks = report.tasksCompleted?.length || 0;

    const plannedTasks = report.tasksPlanned?.length || 0;

    const blockers = report.blockers?.length || 0;

    const totalHours =
        Number(report.hours?.development || 0) +
        Number(report.hours?.testing || 0) +
        Number(report.hours?.meetings || 0) +
        Number(report.hours?.documentation || 0);

    const statistics = [
        {
            label: "Tasks Completed",
            value: completedTasks,
            icon: ListChecks,
        },
        {
            label: "Tasks Planned",
            value: plannedTasks,
            icon: CalendarClock,
        },
        {
            label: "Blockers",
            value: blockers,
            icon: AlertTriangle,
        },
        {
            label: "Total Hours",
            value: `${totalHours}h`,
            icon: Clock,
        },
    ];

    return (
        <section className="border-b border-[#dcdddf] px-6 py-6">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#1b496d]">
                Weekly Statistics
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {statistics.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="rounded-lg border border-[#dcdddf] bg-[#f2f2f2] p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-[#6b7280]">
                                        {item.label}
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#1b3040]">
                                        {item.value}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3d8086]/10 text-[#3d8086]">
                                    <Icon size={19} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ReportStatistics;