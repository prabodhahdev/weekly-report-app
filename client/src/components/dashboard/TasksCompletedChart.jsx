import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const data = [
    { week: "Aug 17", tasks: 18 },
    { week: "Aug 24", tasks: 24 },
    { week: "Aug 31", tasks: 21 },
    { week: "Sep 07", tasks: 29 },
    { week: "Sep 14", tasks: 34 },
];

const TasksCompletedChart = () => {
    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-900">
                    Tasks Completed Trend
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                    Team-wide completed tasks over time
                </p>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
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
            </div>
        </div>
    );
};

export default TasksCompletedChart;