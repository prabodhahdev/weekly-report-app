import {
  LayoutDashboard,
  FilePenLine,
  History,
  User,
  FolderKanban,
  Users,
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
  { label: "Team Reports", path: "/manager-reports", icon: History },
  { label: "Projects", path: "/manager-projects", icon: FolderKanban },
  { label: "Team", path: "/manager-team", icon: Users },
  ...COMMON_ITEMS,
];

export function getNavItems(role) {
  return role === "manager" ? MANAGER_NAV_ITEMS : MEMBER_NAV_ITEMS;
}