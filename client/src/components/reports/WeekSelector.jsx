function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const inputClass =
  "w-full h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500";

export default function WeekSelector({ weekStart, onChange, disabled }) {
  const weekEnd = weekStart ? addDays(weekStart, 6) : "";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Week starting</label>
        <input
          type="date"
          value={weekStart}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Week ending</label>
        <input type="date" value={weekEnd} disabled className={`${inputClass} bg-gray-50`} />
      </div>
    </div>
  );
}