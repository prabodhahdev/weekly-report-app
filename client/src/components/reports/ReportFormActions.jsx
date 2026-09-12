export default function ReportFormActions({ loading, isResubmitting, editMode, onSaveDraft, onSubmit }) {
  return (
    <div className="flex gap-3 mt-5 mb-6">
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={loading}
        className="h-10 px-4 rounded-lg border cursor-pointer border-[#d6d9e2] text-sm font-medium text-[#1b3040] hover:bg-[#f2f2f2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Saving..." : editMode ? "Save changes" : "Save draft"}
      </button>

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="h-10 px-4 rounded-lg bg-[#1b496d] text-white text-sm font-medium cursor-pointer hover:bg-[#153b58] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : isResubmitting ? "Resubmit for review" : "Submit for review"}
      </button>
    </div>
  );
}