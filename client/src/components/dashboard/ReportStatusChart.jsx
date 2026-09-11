import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    {
        member: "John",
        submitted: 4,
        approved: 3,
        correction: 1,
    },
    {
        member: "Sarah",
        submitted: 4,
        approved: 2,
        correction: 2,
    },
    {
        member: "Alex",
        submitted: 4,
        approved: 4,
        correction: 0,
    },
    {
        member: "Emma",
        submitted: 3,
        approved: 2,
        correction: 1,
    },
];

const ReportStatusChart = () => {
    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
            <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-900">
                    Report Status by Team Member
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Report submission and review status
                </p>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="member"
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

                        <Legend />

                        <Bar
                            dataKey="submitted"
                            name="Submitted"
                            fill="#1b496d"
                            radius={[4, 4, 0, 0]}
                        />

                        <Bar
                            dataKey="approved"
                            name="Approved"
                            fill="#3c8385"
                            radius={[4, 4, 0, 0]}
                        />

                        <Bar
                            dataKey="correction"
                            name="Needs Correction"
                            fill="#dcdddf"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ReportStatusChart;