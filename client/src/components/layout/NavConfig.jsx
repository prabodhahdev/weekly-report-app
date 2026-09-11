import {
  LayoutDashboard,
  FilePenLine,
  History,
  User,
  FolderKanban,
  Users,
  ClipboardCheck,
} from "lucide-react";

const COMMON_ITEMS = [
  { label: "Profile", path: "/profile", icon: User },
];

export const MEMBER_NAV_ITEMS = [
  { label: "Dashboard", path: "/member-dashboard", icon: LayoutDashboard },
  { label: "My Weekly Report", path: "/member-report", icon: FilePenLine },
  { label: "My Reports", path: "/member-reports", icon: History },
  ...COMMON_ITEMS,
];

export const MANAGER_NAV_ITEMS = [
  { label: "Dashboard", path: "/manager-dashboard", icon: LayoutDashboard },
  { label: "Reports", path: "/manager-reports", icon: History },
  { label: "Review Queue", path: "/manager-review", icon: ClipboardCheck },
  { label: "Team Members", path: "/manager-team", icon: Users },
  { label: "Projects", path: "/manager-projects", icon: FolderKanban },
  { label: "User Management", path: "/manager-users", icon: Users },
  ...COMMON_ITEMS,
];

export function getNavItems(role) {
  return role === "manager" ? MANAGER_NAV_ITEMS : MEMBER_NAV_ITEMS;
}