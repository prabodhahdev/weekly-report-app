import { NavLink } from "react-router-dom";

export default function SidebarNavItem({ label, path, icon: Icon, onClick }) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 rounded-md text-sm transition-colors ${
          isActive
            ? "bg-[#486d8a] text-[#fcfeff] font-medium shadow-sm"
            : "text-[#fcfeff] hover:bg-[#487496]"
        }`
      }
    >
      <Icon size={18} strokeWidth={2} aria-hidden="true" />
      <span>{label}</span>
    </NavLink>
  );
}