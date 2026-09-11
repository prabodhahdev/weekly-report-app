import { MessageSquareText } from "lucide-react";

const ManagerFeedback = ({ feedback }) => {
    if (!feedback) {
        return null;
    }

    return (
        <section className="px-6 py-6">
            <div className="mb-5 flex items-center gap-2">
                <MessageSquareText
                    size={18}
                    className="text-[#00a968]"
                />

                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Manager Feedback
                </h2>
            </div>

            <div className="rounded-lg border border-[#00df82]/20 bg-[#00df82]/5 p-4">
                <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                    {typeof feedback === "string"
                        ? feedback
                        : feedback.comment || "-"}
                </p>

                {typeof feedback === "object" &&
                    feedback.manager?.name && (
                        <p className="mt-3 text-xs font-medium text-slate-500">
                            Reviewed by{" "}
                            <span className="font-semibold text-[#010a1f]">
                                {feedback.manager.name}
                            </span>
                        </p>
                    )}
            </div>
        </section>
    );
};

export default ManagerFeedback;