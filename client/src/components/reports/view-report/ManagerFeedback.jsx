import { MessageSquareText } from "lucide-react";

const ManagerFeedback = ({ feedback }) => {
  if (!feedback) {
    return null;
  }

  return (
    <section className="px-6 py-6">
      <div className="mb-5 flex items-center gap-2">
        <MessageSquareText size={18} className="text-amber-600" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#1b496d]">
          Manager Feedback
        </h2>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="whitespace-pre-line text-sm leading-6 text-[#1b3040]">
          {typeof feedback === "string" ? feedback : feedback.comment || "-"}
        </p>

        {typeof feedback === "object" && feedback.manager?.name && (
          <p className="mt-3 text-xs font-medium text-[#9ca3af]">
            Reviewed by{" "}
            <span className="font-semibold text-[#1b496d]">
              {feedback.manager.name}
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default ManagerFeedback;