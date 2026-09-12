import { ChevronDown } from "lucide-react";

export default function FilterSelect({ value, onChange, children, ariaLabel }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className="h-10 w-full appearance-none rounded-lg border border-[#d6d9e2] bg-white pl-3 pr-9 text-sm text-[#656e79] outline-none transition-colors focus:ring-2 focus:ring-[#3d8086] focus:border-[#3d8086]"
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280]"
        aria-hidden="true"
      />
    </div>
  );
}