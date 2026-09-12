import { getInitials } from "@/utils/initials";

const SIZE_CLASSES = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-xl",
};

export default function Avatar({
  name = "",
  size = "sm",
  className = "",
  fallback = "-",
}) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.sm;

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#1b496d]/10 font-semibold text-[#1b496d] ${sizeClass} ${className}`}
    >
      {getInitials(name) || fallback}
    </div>
  );
}
