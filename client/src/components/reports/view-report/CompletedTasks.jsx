import { ListChecks } from "lucide-react";

const CompletedTasks = ({ tasks = [] }) => {
  if (!tasks.length) {
    return null;
  }

  return (
    <section className="border-b border-[#dcdddf] px-6 py-6">
      <div className="mb-5 flex items-center gap-2">
        <ListChecks size={18} className="text-[#3d8086]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Tasks Completed
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto rounded-lg border border-[#dcdddf] md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#1b496d] text-white">
            <tr>
              <th className="px-4 py-3 font-semibold">Task</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Planned</th>
              <th className="px-4 py-3 font-semibold">Actual</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Output / Deliverable</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#f2f2f2]">
            {tasks.map((task, index) => (
              <tr key={task._id || task.id || index} className="hover:bg-[#f2f2f2]/50">
                <td className="px-4 py-4 font-medium text-[#1b3040]">
                  {task.taskName || task.name || "-"}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      task.priority === "High"
                        ? "bg-red-50 text-red-600"
                        : task.priority === "Medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-[#dcdddf] text-[#6b7280]"
                    }`}
                  >
                    {task.priority || "-"}
                  </span>
                </td>

                <td className="px-4 py-4 text-[#6b7280]">
                  {task.plannedPercentage ?? task.plannedPercent ?? 0}%
                </td>

                <td className="px-4 py-4 font-medium text-[#3d8086]">
                  {task.actualPercentage ?? task.actualPercent ?? 0}%
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-[#caf19c]/40 px-2.5 py-1 text-xs font-semibold text-[#1b496d]">
                    {task.status || "-"}
                  </span>
                </td>

                <td className="px-4 py-4 whitespace-nowrap text-[#6b7280]">
                  {task.timeSpent ?? task.hoursSpent ?? 0}h
                  <span className="mx-1 text-[#dcdddf]">/</span>
                  {task.timePlanned ?? task.hoursPlanned ?? 0}h
                </td>

                <td className="px-4 py-4 text-[#6b7280]">
                  {task.output || task.deliverable || "-"}
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
            key={task._id || task.id || index}
            className="rounded-lg border border-[#dcdddf] bg-[#f2f2f2] p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-semibold text-[#1b3040]">
                {task.taskName || task.name || "-"}
              </h3>

              <span className="shrink-0 rounded-full bg-[#caf19c]/40 px-2.5 py-1 text-xs font-semibold text-[#1b496d]">
                {task.status || "-"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-[#9ca3af]">Priority</p>
                <p className="mt-1 font-medium text-[#1b3040]">
                  {task.priority || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#9ca3af]">Progress</p>
                <p className="mt-1 font-medium text-[#3d8086]">
                  {task.actualPercentage ?? task.actualPercent ?? 0}%
                </p>
              </div>

              <div>
                <p className="text-xs text-[#9ca3af]">Planned Time</p>
                <p className="mt-1 font-medium text-[#1b3040]">
                  {task.timePlanned ?? task.hoursPlanned ?? 0}h
                </p>
              </div>

              <div>
                <p className="text-xs text-[#9ca3af]">Time Spent</p>
                <p className="mt-1 font-medium text-[#1b3040]">
                  {task.timeSpent ?? task.hoursSpent ?? 0}h
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-[#dcdddf] pt-3">
              <p className="text-xs text-[#9ca3af]">Output / Deliverable</p>
              <p className="mt-1 text-sm leading-6 text-[#1b3040]">
                {task.output || task.deliverable || "-"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompletedTasks;