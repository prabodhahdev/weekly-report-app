
import { useState } from "react";
import { Check, MessageSquareText, X } from "lucide-react";

const ManagerReviewActions = ({ onReview, loading = false }) => {
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [comment, setComment] = useState("");

    const handleRequestChanges = () => {
        setShowCommentBox(true);
    };

    const handleCancel = () => {
        setShowCommentBox(false);
        setComment("");
    };

    const handleSubmitChanges = () => {
        const trimmedComment = comment.trim();

        if (!trimmedComment) {
            return;
        }

        onReview({
            action: "needs_correction",
            comment: trimmedComment,
        });
    };

    const handleApprove = () => {
        onReview({
            action: "approved",
            comment: "",
        });
    };

    return (
        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#010a1f]">
                    Review Report
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                    Review this report and approve it or request changes.
                </p>
            </div>

            {!showCommentBox ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={handleApprove}
                        disabled={loading}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#00df82] px-4 py-2.5 text-sm font-semibold text-[#010a1f] transition hover:bg-[#00c875] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Check size={17} />
                        Approve
                    </button>

                    <button
                        type="button"
                        onClick={handleRequestChanges}
                        disabled={loading}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#1b496d] px-4 py-2.5 text-sm font-semibold text-[#1b496d] transition hover:bg-[#1b496d]/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <MessageSquareText size={17} />
                        Request Changes
                    </button>
                </div>
            ) : (
                <div>
                    <label
                        htmlFor="manager-comment"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Comment
                    </label>

                    <textarea
                        id="manager-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Explain what needs to be corrected..."
                        rows={5}
                        className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10"
                    />

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <X size={16} />
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmitChanges}
                            disabled={loading || !comment.trim()}
                            className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-[#1b496d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#153b58] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <MessageSquareText size={16} />
                            {loading
                                ? "Sending..."
                                : "Send for Correction"}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ManagerReviewActions;