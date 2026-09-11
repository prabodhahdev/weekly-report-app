import { NavLink } from "react-router-dom";

export default function SidebarNavItem({ label, path, icon: Icon, onClick }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-gradient-to-br from-purple-600 via-indigo-400 to-indigo-400 text-white font-medium shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}