import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function SidebarUserFooter({ user, onLogout }) {
  return (
    <div className="border-t border-gray-200 pt-3 mt-3">
      <Link
        to="/profile"
        className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-medium flex items-center justify-center shrink-0">
          {initials(user?.name) || "U"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name || "Unknown user"}
          </p>
          <p className="text-xs text-gray-500 truncate capitalize">
            {user?.role || "Team member"}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-md text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
      >
        <LogOut size={18} strokeWidth={2} aria-hidden="true" />
        <span>Log out</span>
      </button>
    </div>
  );
}