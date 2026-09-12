import { getStatusLabel, getStatusBadgeClass } from "@/utils/reportStatus";

export default function ReportStatusBadge({ status, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${getStatusBadgeClass(status)} ${className}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
