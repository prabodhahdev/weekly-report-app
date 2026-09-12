export default function NotesSection({ value, onChange, disabled }) {
  return (
    <textarea
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      placeholder="Optional notes or links"
      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-50"
    />
  );
}