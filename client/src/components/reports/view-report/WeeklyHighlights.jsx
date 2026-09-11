import { Trophy } from "lucide-react";

const WeeklyHighlights = ({ highlights = [] }) => {
    if (!highlights.length) {
        return null;
    }

    return (
        <section className="border-b border-slate-200 px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <Trophy size={18} className="text-[#00a968]" />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Weekly Highlights
                </h2>
            </div>

            <div className="space-y-3">
                {highlights.map((highlight, index) => {
                    const text =
                        typeof highlight === "string"
                            ? highlight
                            : highlight.text || highlight.description;

                    const isKey =
                        typeof highlight === "object" &&
                        (highlight.isKey ||
                            highlight.isKeyAchievement);

                    return (
                        <div
                            key={highlight._id || highlight.id || index}
                            className={`flex items-start gap-3 rounded-lg p-3 ${
                                isKey
                                    ? "border border-[#00df82]/30 bg-[#00df82]/5"
                                    : "bg-slate-50"
                            }`}
                        >
                            <span className="mt-0.5 text-[#00a968]">
                                •
                            </span>

                            <p className="flex-1 text-sm leading-6 text-slate-700">
                                {text}
                            </p>

                            {isKey && (
                                <span className="shrink-0 rounded-full bg-[#00df82]/10 px-2.5 py-1 text-xs font-semibold text-[#008f5a]">
                                    Key Achievement
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WeeklyHighlights;