const VARIANTS = {
  navy: {
    card: "bg-gradient-to-br from-[#1b496d] to-[#12324c]",
    label: "text-white/70",
    value: "text-white",
    subLabel: "text-white/50",
    iconBg: "bg-white/15",
    iconColor: "text-white",
    trend: "stroke-white/40",
  },
  teal: {
    card: "bg-gradient-to-br from-[#3d8086] to-[#2a5c61]",
    label: "text-white/70",
    value: "text-white",
    subLabel: "text-white/50",
    iconBg: "bg-white/15",
    iconColor: "text-white",
    trend: "stroke-white/40",
  },
  mint: {
    card: "bg-gradient-to-br from-[#caf19c] to-[#a3d977]",
    label: "text-[#1b496d]/70",
    value: "text-[#1b3040]",
    subLabel: "text-[#1b496d]/60",
    iconBg: "bg-white/50",
    iconColor: "text-[#1b496d]",
    trend: "stroke-[#1b496d]/30",
  },
  navyDeep: {
    card: "bg-gradient-to-br from-[#12324c] to-[#0b2233]",
    label: "text-white/70",
    value: "text-white",
    subLabel: "text-[#caf19c]/80",
    iconBg: "bg-[#caf19c]/20",
    iconColor: "text-[#caf19c]",
    trend: "stroke-[#caf19c]/40",
  },
};

/**
 * Shared KPI card for member and manager dashboards.
 * Member: label / subLabel + sparkline layout
 * Manager: title / description layout (pass layout="manager")
 */
export default function StatCard({
  label,
  title,
  value,
  subLabel,
  description,
  icon: Icon,
  variant = "navy",
  layout = "member",
}) {
  const v = VARIANTS[variant] || VARIANTS.navy;
  const heading = label ?? title;
  const detail = subLabel ?? description;

  if (layout === "manager") {
    return (
      <div className={`rounded-2xl p-5 shadow-sm ${v.card}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-md font-medium ${v.label}`}>{heading}</p>
            <h3 className={`mt-2 text-3xl font-bold ${v.value}`}>{value}</h3>
            {detail && (
              <p className={`mt-1 text-sm ${v.subLabel}`}>{detail}</p>
            )}
          </div>

          {Icon && (
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${v.iconBg} ${v.iconColor}`}
            >
              <Icon size={20} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 shadow-sm ${v.card}`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${v.iconBg} ${v.iconColor}`}>
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <h2 className={`text-2xl font-bold ${v.value}`}>{value}</h2>
          <p className={`mt-1 text-lg font-medium ${v.label}`}>{heading}</p>
        </div>

        <svg width="56" height="24" viewBox="0 0 56 24" fill="none" className="shrink-0 mb-1">
          <path
            d="M1 16C6 16 6 6 11 6C16 6 16 18 21 18C26 18 26 4 31 4C36 4 36 20 41 20C46 20 46 10 51 10C53 10 54 12 55 12"
            className={v.trend}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {detail && (
        <p className={`mt-1 text-sm ${v.subLabel}`}>{detail}</p>
      )}
    </div>
  );
}
