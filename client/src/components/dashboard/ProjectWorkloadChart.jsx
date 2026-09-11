
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const ProjectWorkloadChart = ({ reports = [] }) => {

    const projectMap = {};

    reports.forEach((report) => {
        const projectName =
            report.project?.name || "No Project";

        const tasks =
            report.currentVersion?.tasksCompleted ||
            [];

        if (!projectMap[projectName]) {
            projectMap[projectName] = 0;
        }

        projectMap[projectName] += tasks.length;
    });

    const data = Object.entries(projectMap)
        .map(([project, tasks]) => ({
            project,
            tasks,
        }))
        .sort(
            (a, b) =>
                b.tasks - a.tasks
        )
        .slice(0, 6);

    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">

            <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-900">
                    Workload by Project
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Number of completed tasks across projects
                </p>
            </div>

            <div className="h-72 w-full">

                {data.length > 0 ? (
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{
                                left: 15,
                                right: 15,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={false}
                            />

                            <XAxis
                                type="number"
                                allowDecimals={false}
                                tick={{ fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                type="category"
                                dataKey="project"
                                width={90}
                                tick={{ fontSize: 11 }}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="tasks"
                                name="Tasks"
                                fill="#3c8385"
                                radius={[
                                    0,
                                    5,
                                    5,
                                    0,
                                ]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-500">
                            No project data available.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProjectWorkloadChart;
