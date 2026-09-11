const STATUS_STYLES = {
  draft: "bg-gray-100 text-gray-600",
  submitted: "bg-indigo-100 text-indigo-700",
  needs_correction: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
};

const STATUS_LABELS = {
  draft: "Draft",
  submitted: "Submitted",
  needs_correction: "Needs Correction",
  approved: "Approved",
};

export default function ReportStatusBadge({ status }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}