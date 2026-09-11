import { AlertTriangle } from "lucide-react";

const BlockersSection = ({ blockers = [] }) => {
    if (!blockers.length) {
        return null;
    }

    return (
        <section className="border-b border-slate-200 px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <AlertTriangle
                    size={18}
                    className="text-red-500"
                />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Blockers
                </h2>
            </div>

            <div className="space-y-3">
                {blockers.map((blocker, index) => {
                    const text =
                        typeof blocker === "string"
                            ? blocker
                            : blocker.text ||
                              blocker.description ||
                              blocker.blocker;

                    const isKey =
                        typeof blocker === "object" &&
                        (blocker.isKey ||
                            blocker.isKeyIssue);

                    return (
                        <div
                            key={
                                blocker._id ||
                                blocker.id ||
                                index
                            }
                            className={`flex items-start gap-3 rounded-lg p-4 ${
                                isKey
                                    ? "border border-red-200 bg-red-50"
                                    : "bg-slate-50"
                            }`}
                        >
                            <AlertTriangle
                                size={17}
                                className={`mt-0.5 shrink-0 ${
                                    isKey
                                        ? "text-red-500"
                                        : "text-slate-400"
                                }`}
                            />

                            <div className="flex-1">
                                <p className="text-sm leading-6 text-slate-700">
                                    {text || "-"}
                                </p>
                            </div>

                            {isKey && (
                                <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
                                    Key Issue
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BlockersSection;