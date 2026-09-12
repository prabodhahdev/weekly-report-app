export const STATUS_LABELS = {
  draft: "Draft",
  submitted: "Submitted",
  needs_correction: "Needs Correction",
  approved: "Approved",
};

/** Badge styles used in tables and list views */
export const STATUS_BADGE_STYLES = {
  approved: "bg-[#caf19c]/40 text-[#1b496d]",
  needs_correction: "bg-[#1b496d] text-white",
  submitted: "bg-[#c5f39b] text-[#3d8086]",
  draft: "bg-[#dcdddf] text-[#5a5f66]",
};

/** Pill styles used on the report form header banner */
export const STATUS_BANNER_STYLES = {
  draft: "bg-white/20 text-white",
  submitted: "bg-white text-indigo-700",
  needs_correction: "bg-amber-400 text-amber-950",
  approved: "bg-green-400 text-green-950",
};

export function getStatusLabel(status) {
  return STATUS_LABELS[status] || status || "-";
}

export function getStatusBadgeClass(status) {
  return STATUS_BADGE_STYLES[status] || "bg-[#dcdddf] text-[#5a5f66]";
}

export function getStatusBannerClass(status) {
  return STATUS_BANNER_STYLES[status] || "";
}
