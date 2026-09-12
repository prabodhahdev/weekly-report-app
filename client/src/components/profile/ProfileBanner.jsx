import { Mail } from "lucide-react";
import { getInitials } from "@/utils/initials";

export default function ProfileBanner({ name, email, role }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#1b496d] p-6 shadow-sm">
      <div
        className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#3d8086]/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 right-28 h-32 w-32 rounded-full bg-[#caf19c]/15"
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#caf19c] text-xl font-bold text-[#1b496d] ring-4 ring-white/10">
          {getInitials(name) || "U"}
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-white truncate">{name}</h2>

          <p className="mt-1 flex items-center gap-2 text-sm text-white/70 truncate">
            <Mail size={14} className="shrink-0" />
            {email}
          </p>

          <span className="mt-3 inline-flex rounded-full bg-[#caf19c] px-3 py-1 text-xs font-semibold capitalize text-[#1b496d]">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
