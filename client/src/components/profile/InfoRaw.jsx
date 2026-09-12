export default function InfoRow({ icon: Icon, label, value, valueClassName = "" }) {
  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f2f2f2] text-[#3d8086]">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#9ca3af]">{label}</p>
        <p className={`mt-0.5 text-sm font-semibold text-[#1b3040] truncate ${valueClassName}`}>
          {value}
        </p>
      </div>
    </div>
  );
}