import { CalendarDays, ChevronDown } from "lucide-react";

const WeeklySummaryFilters = ({
  weekStart,
  setWeekStart,
  section,
  setSection,
}) => {
  return (
    <div className="rounded-2xl border border-[#dcdddf] bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Week */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1b3040]">
            Select week
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            />

            <input
              type="date"
              value={weekStart}
              onChange={(e) => setWeekStart(e.target.value)}
              className="w-full rounded-xl border border-[#d6d9e2] bg-[#f2f2f2] py-3 pl-10 pr-3 text-sm text-[#1b3040] outline-none transition focus:border-[#3d8086] focus:bg-white"
            />
          </div>
        </div>

        {/* Section */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[#1b3040]">
            Compare section
          </label>

          <div className="relative">
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#d6d9e2] bg-[#f2f2f2] px-4 py-3 text-sm text-[#1b3040] outline-none transition focus:border-[#3d8086] focus:bg-white"
            >
              <option value="blockers">Blockers</option>
              <option value="achievements">Achievements</option>
              <option value="tasksCompleted">Tasks Completed</option>
              <option value="tasksPlanned">Tasks Planned</option>
              <option value="notes">Notes</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummaryFilters;