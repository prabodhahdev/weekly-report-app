import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    {
        name: "Development",
        value: 72,
    },
    {
        name: "Meetings",
        value: 18,
    },
    {
        name: "Testing",
        value: 25,
    },
    {
        name: "Documentation",
        value: 12,
    },
    {
        name: "Research",
        value: 15,
    },
];

const COLORS = [
    "#1b496d",
    "#3c8385",
    "#00a968",
    "#8ab17d",
    "#dcdddf",
];

const TaskTypeTimeChart = () => {
    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-900">
                    Time Spent by Task Type
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Team-wide hours by task category
                </p>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
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
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) => [`${value} hours`, "Time"]}
                        />

                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TaskTypeTimeChart;