import {
    ListChecks,
    CalendarClock,
    AlertTriangle,
    Clock,
} from "lucide-react";

const ReportStatistics = ({ report }) => {
    const completedTasks = report.completedTasks?.length || 0;
    const plannedTasks = report.nextWeekTasks?.length || 0;
    const blockers = report.blockers?.length || 0;

    const totalHours =
        report.hoursBreakdown?.reduce(
            (total, item) => total + Number(item.hours || 0),
            0
        ) || 0;

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
        <section className="border-b border-slate-200 px-6 py-6">
            <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                Weekly Statistics
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {statistics.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-500">
                                        {item.label}
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-[#010a1f]">
                                        {item.value}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00df82]/10 text-[#00a968]">
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