const PROJECTS = ["Client A", "Internal Tooling", "R&D", "Marketing"];
const STATUSES = [
  { value: "", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "needs_correction", label: "Needs Correction" },
  { value: "approved", label: "Approved" },
];

const fieldClass =
  "h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

export default function ReportsFilterBar({ filters, onChange, members }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  const hasActiveFilters =
    filters.project || filters.status || filters.from || filters.to || filters.member;

  return (
    <div className="flex flex-wrap gap-3">
      {members && (
        <select
          value={filters.member || ""}
          onChange={(e) => update("member", e.target.value)}
          className={fieldClass}
        >
          <option value="">All members</option>
          {members.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      )}

      <select
        value={filters.project}
        onChange={(e) => update("project", e.target.value)}
        className={fieldClass}
      >
        <option value="">All projects</option>
        {PROJECTS.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
        className={fieldClass}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.from}
        onChange={(e) => update("from", e.target.value)}
        className={fieldClass}
        aria-label="From date"
      />
      <span className="self-center text-gray-400 text-sm">to</span>
      <input
        type="date"
        value={filters.to}
        onChange={(e) => update("to", e.target.value)}
        className={fieldClass}
        aria-label="To date"
      />

      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => onChange({ project: "", status: "", from: "", to: "", member: "" })}
          className="text-sm text-indigo-600 hover:text-indigo-700 self-center"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}