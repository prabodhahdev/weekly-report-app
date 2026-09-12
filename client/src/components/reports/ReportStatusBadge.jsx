const STATUS_CONFIG = {
  approved: { label: "Approved", className: "bg-[#caf19c]/40 text-[#1b496d]" },
  needs_correction: { label: "Needs Correction", className: "bg-[#1b496d] text-white" },
  submitted: { label: "Submitted", className: "bg-[#c5f39b] text-[#3d8086]" },
  draft: { label: "Draft", className: "bg-[#dcdddf] text-[#5a5f66]" },
};

export default function ReportStatusBadge({ status, className = "" }) {
  const config = STATUS_CONFIG[status] || {
    label: status || "-",
    className: "bg-[#dcdddf] text-[#5a5f66]",
  };

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}