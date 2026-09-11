const CATEGORIES = [
  { key: "development", label: "Development" },
  { key: "testing", label: "Testing" },
  { key: "meetings", label: "Meetings" },
  { key: "documentation", label: "Documentation" },
];

export default function HoursBreakdown({ hours, onChange, disabled }) {
  function updateHour(key, value) { onChange({ ...hours, [key]: value }); }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {CATEGORIES.map(({ key, label }) => (
        <div key={key}>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
          <input type="number" min="0" value={hours[key]} disabled={disabled} placeholder="0"
            onChange={(e) => updateHour(key, e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm text-center outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50" />
        </div>
      ))}
    </div>
  );
}