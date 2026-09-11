const STATUS_STYLES = {
  draft: "bg-white/20 text-white",
  submitted: "bg-white text-indigo-700",
  needs_correction: "bg-amber-400 text-amber-950",
  approved: "bg-green-400 text-green-950",
};

const STATUS_LABELS = {
  draft: "Draft",
  submitted: "Submitted",
  needs_correction: "Needs Correction",
  approved: "Approved",
};

export default function StatusBanner({ status, managerComment }) {
  return (
    <div>
      <span
        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[status]}`}
      >
        {STATUS_LABELS[status]}
      </span>

      {status === "needs_correction" && managerComment && (
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 max-w-xl">
          <span className="font-medium">Manager comment: </span>
          {managerComment}
        </div>
      )}
    </div>
  );
}