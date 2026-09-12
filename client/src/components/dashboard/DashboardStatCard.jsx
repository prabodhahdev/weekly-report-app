const VARIANTS = {
  navy: {
    card: "bg-gradient-to-br from-[#1b496d] to-[#12324c]",
    title: "text-white/70",
    value: "text-white",
    description: "text-white/50",
    iconBg: "bg-white/15",
    iconColor: "text-white",
  },
  teal: {
    card: "bg-gradient-to-br from-[#3d8086] to-[#2a5c61]",
    title: "text-white/70",
    value: "text-white",
    description: "text-white/50",
    iconBg: "bg-white/15",
    iconColor: "text-white",
  },
  mint: {
    card: "bg-gradient-to-br from-[#caf19c] to-[#a3d977]",
    title: "text-[#1b496d]/70",
    value: "text-[#1b3040]",
    description: "text-[#1b496d]/60",
    iconBg: "bg-white/50",
    iconColor: "text-[#1b496d]",
  },
  navyDeep: {
    card: "bg-gradient-to-br from-[#12324c] to-[#0b2233]",
    title: "text-white/70",
    value: "text-white",
    description: "text-[#caf19c]/80",
    iconBg: "bg-[#caf19c]/20",
    iconColor: "text-[#caf19c]",
  },
};

const DashboardStatCard = ({
  title,
  value,
  description,
  icon: Icon,
  variant = "navy",
}) => {
  const v = VARIANTS[variant] || VARIANTS.navy;

  return (
    <div className={`rounded-2xl p-5 shadow-sm ${v.card}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-md font-medium ${v.title}`}>{title}</p>
          <h3 className={`mt-2 text-3xl font-bold ${v.value}`}>{value}</h3>
          {description && (
            <p className={`mt-1 text-sm ${v.description}`}>{description}</p>
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
};

export default DashboardStatCard;