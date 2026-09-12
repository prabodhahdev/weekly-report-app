import { Trophy } from "lucide-react";

const WeeklyHighlights = ({ highlights = [] }) => {
  if (!highlights.length) {
    return null;
  }

  return (
    <section className="border-b border-[#dcdddf] px-6 py-6">
      <div className="mb-5 flex items-center gap-2">
        <Trophy size={18} className="text-[#3d8086]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
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
            (highlight.isKey || highlight.isKeyAchievement);

          return (
            <div
              key={highlight._id || highlight.id || index}
              className={`flex items-start gap-3 rounded-lg p-3 ${
                isKey
                  ? "border border-[#caf19c] bg-[#caf19c]/15"
                  : "bg-[#f2f2f2]"
              }`}
            >
              <span className="mt-0.5 text-[#3d8086]">•</span>

              <p className="flex-1 text-sm leading-6 text-[#1b3040]">
                {text}
              </p>

              {isKey && (
                <span className="shrink-0 rounded-full bg-[#caf19c] px-2.5 py-1 text-xs font-semibold text-[#1b496d]">
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