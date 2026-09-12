function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const inputClass =
  "w-full h-10 rounded-lg border border-[#d6d9e2] px-3 text-sm text-[#1b3040] outline-none transition-colors focus:ring-2 focus:ring-[#3d8086] focus:border-[#3d8086] disabled:bg-[#f2f2f2] disabled:text-[#9ca3af]";

export default function WeekSelector({ weekStart, onChange, disabled }) {
  const weekEnd = weekStart ? addDays(weekStart, 6) : "";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-[#6b7280] mb-1.5">Week starting</label>
        <input
          type="date"
          value={weekStart}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#6b7280] mb-1.5">Week ending</label>
        <input type="date" value={weekEnd} disabled className={`${inputClass} bg-[#f2f2f2]`} />
      </div>
    </div>
  );
}