import { CalendarClock } from "lucide-react";

const NextWeekTasks = ({ tasks = [] }) => {
  if (!tasks.length) {
    return null;
  }

  return (
    <section className="border-b border-[#dcdddf] px-6 py-6">
      <div className="mb-5 flex items-center gap-2">
        <CalendarClock size={18} className="text-[#3d8086]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Tasks for Next Week
        </h2>
      </div>

      <div className="space-y-3">
        {tasks.map((task, index) => {
          const taskName =
            typeof task === "string"
              ? task
              : task.taskName || task.name || task.description;

          return (
            <div
              key={task._id || task.id || index}
              className="flex items-start gap-3 rounded-lg bg-[#f2f2f2] p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1b496d] text-xs font-semibold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="pt-0.5 text-sm leading-6 text-[#1b3040]">
                {taskName || "-"}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NextWeekTasks;