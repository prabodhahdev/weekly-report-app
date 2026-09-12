import { getStatusLabel, getStatusBannerClass } from "@/utils/reportStatus";

export default function StatusBanner({ status, managerComment }) {
  return (
    <div>
      <span
        className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getStatusBannerClass(status)}`}
      >
        {getStatusLabel(status)}
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
