const PROJECTS = ["Client A", "Internal Tooling", "R&D", "Marketing"];

export default function ProjectSelect({ value, onChange, disabled }) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
    >
      <option value="">Select a project</option>
      {PROJECTS.map((p) => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>
  );
}