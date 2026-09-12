
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = [
    "#1b496d",
    "#3c8385",
    "#00a968",
    "#8ab17d",
];

const TaskTypeTimeChart = ({ reports = [] }) => {

    const totals = {
        Development: 0,
        Testing: 0,
        Meetings: 0,
        Documentation: 0,
    };

    reports.forEach((report) => {
        const hours =
            report.currentVersion?.hours || {};

        totals.Development +=
            Number(hours.development || 0);

        totals.Testing +=
            Number(hours.testing || 0);

        totals.Meetings +=
            Number(hours.meetings || 0);

        totals.Documentation +=
            Number(hours.documentation || 0);
    });

    const data = Object.entries(totals)
        .map(([name, value]) => ({
            name,
            value,
        }))
        .filter(
            (item) => item.value > 0
        );

    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">

            <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#1b496d]">
                    Time Spent by Task Type
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Team-wide hours by task category
                </p>
            </div>

            <div className="h-72 w-full">

                {data.length > 0 ? (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="45%"
                                outerRadius={85}
                                innerRadius={45}
                                paddingAngle={2}
                            >
                                {data.map(
                                    (entry, index) => (
                                        <Cell
                                            key={`cell-${entry.name}`}
                                            fill={
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Pie>

                            <Tooltip
                                formatter={(
                                    value
                                ) => [
                                    `${value} hours`,
                                    "Time",
                                ]}
                            />

                            <Legend />

                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-500">
                            No time data available.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TaskTypeTimeChart;
