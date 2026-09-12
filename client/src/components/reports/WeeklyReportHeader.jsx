import { FilePenLine } from "lucide-react";
import StatusBanner from "./StatusBanner.jsx";

export default function WeeklyReportHeader({ editMode, status, managerComment }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1b496d] via-[#1b496d] to-[#3d8086] p-6 mb-5 w-full shadow-sm">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-16 right-24 w-32 h-32 bg-[#caf19c]/20 rounded-full blur-2xl" aria-hidden="true" />

      <div className="relative flex items-start gap-4">
        <div className="hidden sm:flex w-11 h-11 rounded-lg bg-white/15 items-center justify-center shrink-0">
          <FilePenLine size={20} className="text-[#caf19c]" aria-hidden="true" />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white">
            {editMode ? "Edit Weekly Report" : "My Weekly Report"}
          </h1>
          <p className="text-sm text-white/70">
            Fields and order are fixed for the whole team so reports stay comparable.
          </p>
          <div className="mt-3">
            <StatusBanner status={status} managerComment={managerComment} />
          </div>
        </div>
      </div>
    </div>
  );
}