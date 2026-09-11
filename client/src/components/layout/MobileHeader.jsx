import { Menu, ClipboardList } from "lucide-react";

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="md:hidden flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <ClipboardList size={18} className="text-indigo-600" aria-hidden="true" />
        <span className="text-sm font-semibold text-gray-900">Weekly</span>
      </div>
      <button
        type="button"
        onClick={onMenuClick}
        className="p-2 -mr-2 rounded-md text-gray-600 hover:bg-gray-100"
        aria-label="Open menu"
      >
        <Menu size={20} aria-hidden="true" />
      </button>
    </header>
  );
}