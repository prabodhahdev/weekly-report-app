import { ClipboardList, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { getNavItems } from "./NavConfig.jsx";
import SidebarNavItem from "./SidebarNavItems.jsx";
import SidebarUserFooter from "./SidebarUserFooter.jsx";

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navItems = getNavItems(user?.role);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col p-4
        transform transition-transform duration-200 ease-in-out
        md:static md:translate-x-0 md:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <ClipboardList size={20} className="text-indigo-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-gray-900">Weekly</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarNavItem key={item.path} {...item} onClick={onClose} />
          ))}
        </nav>

        <SidebarUserFooter user={user} onLogout={logout} />
      </aside>
    </>
  );
}