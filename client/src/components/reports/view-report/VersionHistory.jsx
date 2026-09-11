import { Eye, Clock3 } from "lucide-react";

const VersionHistory = ({
    versions = [],
    selectedVersionId,
    onViewVersion,
}) => {
    if (!versions.length) {
        return (
            <div className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Report Versions
                </h2>

                <p className="mt-4 text-sm text-slate-500">
                    No versions available.
                </p>
            </div>
        );
    }

    function formatStatus(status) {
        if (!status) {
            return "Draft";
        }

        if (status === "needs_correction") {
            return "Needs Correction";
        }

        if (status === "submitted") {
            return "Submitted";
        }

        if (status === "approved") {
            return "Approved";
        }

        if (status === "draft") {
            return "Draft";
        }

        return status;
    }

    function getStatusClass(status) {
        if (status === "approved") {
            return "bg-[#00df82]/10 text-[#008f5a]";
        }

        if (status === "needs_correction") {
            return "bg-red-50 text-red-600";
        }

        if (status === "submitted") {
            return "bg-blue-50 text-blue-600";
        }

        return "bg-slate-100 text-slate-600";
    }

    return (
        <aside className="rounded-lg border border-slate-200 bg-white">

            {/* Header */}
            <div className="border-b border-slate-200 px-5 py-4">

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Report Versions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                    View previous report submissions
                </p>

            </div>

            {/* Versions */}
            <div className="space-y-3 p-4">

                {versions.map((version) => {

                    const versionId =
                        version._id || version.id;

                    const isSelected =
                        versionId === selectedVersionId;

                    const status =
                        version.status || "draft";

                    return (
                        <div
                            key={versionId}
                            className={`rounded-lg border p-4 transition ${
                                isSelected
                                    ? "border-[#00df82] bg-[#00df82]/5"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                            }`}
                        >

                            {/* Version + Selected */}
                            <div className="flex items-start justify-between gap-3">

                                <div>

                                    <p
                                        className={`font-semibold ${
                                            isSelected
                                                ? "text-[#008f5a]"
                                                : "text-[#010a1f]"
                                        }`}
                                    >
                                        Version{" "}
                                        {version.versionNumber || "-"}
                                    </p>

                                    {version.submittedAt && (
                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">

                                            <Clock3 size={13} />

                                            <span>
                                                {new Date(
                                                    version.submittedAt
                                                ).toLocaleDateString()}
                                            </span>

                                        </div>
                                    )}

                                </div>

                                {isSelected && (
                                    <span className="rounded-full bg-[#00df82]/10 px-2 py-1 text-[11px] font-semibold text-[#008f5a]">
                                        Viewing
                                    </span>
                                )}

                            </div>

                            {/* Status */}
                            <div className="mt-3">

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                        status
                                    )}`}
                                >
                                    {formatStatus(status)}
                                </span>

                            </div>

                            {/* View Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    onViewVersion(version)
                                }
                                disabled={isSelected}
                                className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                                    isSelected
                                        ? "cursor-default bg-[#00df82] text-[#010a1f]"
                                        : "bg-[#010a1f] text-white hover:bg-[#0a1f3d]"
                                }`}
                            >

                                <Eye size={16} />

                                {isSelected
                                    ? "Viewing"
                                    : "View"}

                            </button>

                        </div>
                    );
                })}

            </div>

        </aside>
    );
};

export default VersionHistory;