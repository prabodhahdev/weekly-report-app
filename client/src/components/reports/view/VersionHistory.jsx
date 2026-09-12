import { Eye, Clock3 } from "lucide-react";
import ReportStatusBadge from "@/components/reports/list/ReportStatusBadge";

const VersionHistory = ({ versions = [], selectedVersionId, onViewVersion }) => {
  if (!versions.length) {
    return (
      <div className="rounded-lg border border-[#dcdddf] bg-white p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Report Versions
        </h2>
        <p className="mt-4 text-sm text-[#6b7280]">No versions available.</p>
      </div>
    );
  }

  return (
    <aside className="rounded-lg border border-[#dcdddf] bg-white">
      {/* Header */}
      <div className="border-b border-[#dcdddf] px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Report Versions
        </h2>
        <p className="mt-1 text-xs text-[#6b7280]">
          View previous report submissions
        </p>
      </div>

      {/* Versions */}
      <div className="space-y-3 p-4">
        {versions.map((version) => {
          const versionId = version._id || version.id;
          const isSelected = versionId === selectedVersionId;
          const status = version.status || "draft";

          return (
            <div
              key={versionId}
              className={`rounded-lg border p-4 transition ${
                isSelected
                  ? "border-[#3d8086] bg-[#caf19c]/10"
                  : "border-[#dcdddf] bg-white hover:border-[#d6d9e2]"
              }`}
            >
              {/* Version + Selected */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`font-semibold ${
                      isSelected ? "text-[#1b496d]" : "text-[#1b3040]"
                    }`}
                  >
                    Version {version.versionNumber || "-"}
                  </p>

                  {version.submittedAt && (
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-[#6b7280]">
                      <Clock3 size={13} />
                      <span>
                        {new Date(version.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {isSelected && (
                  <span className="rounded-full bg-[#3d8086]/15 px-2 py-1 text-[11px] font-semibold text-[#3d8086]">
                    Viewing
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="mt-3">
                <ReportStatusBadge status={status} />
              </div>

              {/* View Button */}
              <button
                type="button"
                onClick={() => onViewVersion(version)}
                disabled={isSelected}
                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isSelected
                    ? "cursor-default bg-[#caf19c] text-[#1b496d]"
                    : "bg-[#1b496d] text-white hover:bg-[#153b58]"
                }`}
              >
                <Eye size={16} />
                {isSelected ? "Viewing" : "View"}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default VersionHistory;