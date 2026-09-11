import { ListChecks } from "lucide-react";

const CompletedTasks = ({ tasks = [] }) => {
    if (!tasks.length) {
        return null;
    }

    return (
        <section className="border-b border-slate-200 px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <ListChecks size={18} className="text-[#00a968]" />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Tasks Completed
                </h2>
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-lg border border-slate-200 md:block">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#010a1f] text-white">
                        <tr>
                            <th className="px-4 py-3 font-semibold">
                                Task
                            </th>

                            <th className="px-4 py-3 font-semibold">
                                Priority
                            </th>

                            <th className="px-4 py-3 font-semibold">
                                Planned
                            </th>

                            <th className="px-4 py-3 font-semibold">
                                Actual
                            </th>

                            <th className="px-4 py-3 font-semibold">
                                Status
                            </th>

                            <th className="px-4 py-3 font-semibold">
                                Time
                            </th>

                            <th className="px-4 py-3 font-semibold">
                                Output / Deliverable
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-200">
                        {tasks.map((task, index) => (
                            <tr
                                key={
                                    task._id ||
                                    task.id ||
                                    index
                                }
                                className="hover:bg-slate-50"
                            >
                                <td className="px-4 py-4 font-medium text-[#010a1f]">
                                    {task.taskName ||
                                        task.name ||
                                        "-"}
                                </td>

                                <td className="px-4 py-4">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            task.priority === "High"
                                                ? "bg-red-50 text-red-600"
                                                : task.priority ===
                                                  "Medium"
                                                ? "bg-yellow-50 text-yellow-600"
                                                : "bg-slate-100 text-slate-600"
                                        }`}
                                    >
                                        {task.priority || "-"}
                                    </span>
                                </td>

                                <td className="px-4 py-4 text-slate-600">
                                    {task.plannedPercentage ??
                                        task.plannedPercent ??
                                        0}
                                    %
                                </td>

                                <td className="px-4 py-4 font-medium text-[#00a968]">
                                    {task.actualPercentage ??
                                        task.actualPercent ??
                                        0}
                                    %
                                </td>

                                <td className="px-4 py-4">
                                    <span className="rounded-full bg-[#00df82]/10 px-2.5 py-1 text-xs font-semibold text-[#008f5a]">
                                        {task.status || "-"}
                                    </span>
                                </td>

                                <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                                    {task.timeSpent ??
                                        task.hoursSpent ??
                                        0}
                                    h
                                    <span className="mx-1 text-slate-300">
                                        /
                                    </span>
                                    {task.timePlanned ??
                                        task.hoursPlanned ??
                                        0}
                                    h
                                </td>

                                <td className="px-4 py-4 text-slate-600">
                                    {task.output ||
                                        task.deliverable ||
                                        "-"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="space-y-4 md:hidden">
                {tasks.map((task, index) => (
                    <div
                        key={
                            task._id ||
                            task.id ||
                            index
                        }
                        className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    >
                        <div className="mb-4 flex items-start justify-between gap-3">
                            <h3 className="font-semibold text-[#010a1f]">
                                {task.taskName ||
                                    task.name ||
                                    "-"}
                            </h3>

                            <span className="shrink-0 rounded-full bg-[#00df82]/10 px-2.5 py-1 text-xs font-semibold text-[#008f5a]">
                                {task.status || "-"}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-xs text-slate-500">
                                    Priority
                                </p>
                                <p className="mt-1 font-medium text-slate-700">
                                    {task.priority || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Progress
                                </p>
                                <p className="mt-1 font-medium text-[#00a968]">
                                    {task.actualPercentage ??
                                        task.actualPercent ??
                                        0}
                                    %
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Planned Time
                                </p>
                                <p className="mt-1 font-medium text-slate-700">
                                    {task.timePlanned ??
                                        task.hoursPlanned ??
                                        0}
                                    h
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Time Spent
                                </p>
                                <p className="mt-1 font-medium text-slate-700">
                                    {task.timeSpent ??
                                        task.hoursSpent ??
                                        0}
                                    h
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 border-t border-slate-200 pt-3">
                            <p className="text-xs text-slate-500">
                                Output / Deliverable
                            </p>

                            <p className="mt-1 text-sm leading-6 text-slate-700">
                                {task.output ||
                                    task.deliverable ||
                                    "-"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CompletedTasks;