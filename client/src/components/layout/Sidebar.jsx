import { LogOut, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getNavItems } from "./NavConfig.jsx";
import SidebarNavItem from "./SidebarNavItems.jsx";


const DEFAULT_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS73OboNq8YpolvhWur1kpvkaggtHmHEzhY7RPohICuOA&s=10";

const ROLE_LABELS = {
  manager: "Manager",
  member: "Member",
};

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navItems = getNavItems(user?.role);
  const roleLabel = ROLE_LABELS[user?.role] || "Member";

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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1b496d] flex flex-col p-4
        transform transition-transform duration-200 ease-in-out
        md:static md:translate-x-0 md:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* User profile */}
        <Link to="/profile" className="group flex items-center gap-3 px-1 py-2 mb-5 mt-2">
          <img
            src={user?.avatarUrl || DEFAULT_AVATAR}
            alt=""
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[#3d8086] ring-offset-2 ring-offset-[#1b496d] shrink-0"
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate leading-tight">
              {user?.name || "Unknown user"}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              {user?.role === "manager" && (
                <ShieldCheck size={18} className="text-[#caf19c] shrink-0" aria-hidden="true" />
              )}
              <span className="text-xs font-medium text-white px-3 py-1 rounded-xl bg-[#3d8086]">
                {roleLabel}
              </span>
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarNavItem key={item.path} {...item} onClick={onClose} />
          ))}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-white/5 cursor-pointer text-white/70 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/10 pt-3 mt-3"
        >
          <LogOut size={18} strokeWidth={2} aria-hidden="true" />
          <span>Log out</span>
        </button>
      </aside>
    </>
  );
}