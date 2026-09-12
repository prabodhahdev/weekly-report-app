
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

const ReportStatusChart = ({ reports = [] }) => {

    const memberMap = {};

    reports.forEach((report) => {
        const memberName =
            report.member?.name || "Unknown";

        if (!memberMap[memberName]) {
            memberMap[memberName] = {
                member: memberName,
                submitted: 0,
                approved: 0,
                correction: 0,
            };
        }

        if (report.status === "submitted") {
            memberMap[memberName].submitted += 1;
        }

        if (report.status === "approved") {
            memberMap[memberName].approved += 1;
        }

        if (report.status === "needs_correction") {
            memberMap[memberName].correction += 1;
        }
    });

    const data = Object.values(memberMap);

    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">

            <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#1b496d]">
                    Report Status by Team Member
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Report submission and review status
                </p>
            </div>

            <div className="h-72 w-full">

                {data.length > 0 ? (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
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
                                radius={[
                                    4,
                                    4,
                                    0,
                                    0,
                                ]}
                            />

                            <Bar
                                dataKey="approved"
                                name="Approved"
                                fill="#3c8385"
                                radius={[
                                    4,
                                    4,
                                    0,
                                    0,
                                ]}
                            />

                            <Bar
                                dataKey="correction"
                                name="Needs Correction"
                                fill="#dcdddf"
                                radius={[
                                    4,
                                    4,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-500">
                            No report data available.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ReportStatusChart;
