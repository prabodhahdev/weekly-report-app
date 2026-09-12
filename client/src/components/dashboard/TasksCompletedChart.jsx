import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const TasksCompletedChart = ({ reports = [] }) => {

    const weekMap = {};

    reports.forEach((report) => {
        if (!report.weekStart) {
            return;
        }

        const weekDate = new Date(
            report.weekStart
        );

        // Use the Monday of the report week
        const day = weekDate.getDay();
        const diff = day === 0 ? -6 : 1 - day;

        weekDate.setDate(
            weekDate.getDate() + diff
        );

        weekDate.setHours(0, 0, 0, 0);

        const weekKey =
            weekDate.toISOString();

        const tasks =
            report.currentVersion?.tasksCompleted ||
            [];

        if (!weekMap[weekKey]) {
            weekMap[weekKey] = 0;
        }

        weekMap[weekKey] += tasks.length;
    });

    const data = Object.entries(weekMap)
        .map(([week, tasks]) => {
            const date = new Date(week);

            return {
                week: date.toLocaleDateString(
                    undefined,
                    {
                        month: "short",
                        day: "numeric",
                    }
                ),
                tasks,
                date,
            };
        })
        .sort(
            (a, b) =>
                a.date - b.date
        )
        .slice(-8);

    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">

            <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#1b496d]">
                    Tasks Completed Trend
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Team-wide completed tasks over time
                </p>
            </div>

            <div className="h-72 w-full">

                {data.length > 0 ? (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart data={data}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="week"
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="tasks"
                                stroke="#1b496d"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-500">
                            No task data available.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TasksCompletedChart;
