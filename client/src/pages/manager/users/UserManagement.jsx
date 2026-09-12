import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import PageLoader from "@/components/ui/PageLoader.jsx";
import PageHeader from "@/components/ui/PageHeader.jsx";
import ReportActionsMenu from "@/components/reports/list/ReportsActionsMenu.jsx";
import apiFetch from "@/api/apiFetch.js";

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleEditingUser, setRoleEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await apiFetch("/api/auth/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      setUsers(data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);
      toast.error(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (user, newRole) => {
    if (newRole === user.role) {
      setRoleEditingUser(null);
      return;
    }

    try {
      const response = await apiFetch(
        `/api/auth/users/${user._id}/role`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update role");
      }

      toast.success(data.message || "Role updated successfully");
      setRoleEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Update role error:", error);
      toast.error(error.message || "Failed to update role");
    }
  };

  const handleRemoveUser = async (user) => {
    const confirmed = window.confirm(`Are you sure you want to remove ${user.name}?`);
    if (!confirmed) return;

    try {
      const response = await apiFetch(
        `/api/auth/users/${user._id}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove user");
      }

      toast.success(data.message || "User removed successfully");
      setRoleEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Remove user error:", error);
      toast.error(error.message || "Failed to remove user");
    }
  };

  function getActions(user) {
    return [
      {
        label: "Change Role",
        icon: Pencil,
        onClick: () => setRoleEditingUser(user._id),
      },
      {
        label: "Remove User",
        icon: Trash2,
        danger: true,
        onClick: () => handleRemoveUser(user),
      },
    ];
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <PageHeader
          title="User Management"
          description="Manage team members and their roles."
          action={
            <button
              type="button"
              onClick={() => navigate("/manager-users/new")}
              className="inline-flex items-center gap-1.5 h-10 px-4 cursor-pointer rounded-lg bg-[#1b496d] text-white text-sm font-medium hover:bg-[#153b58] transition-colors shadow-sm"
            >
              <Plus size={16} />
              Invite Member
            </button>
          }
        />

        {/* Loading */}
        {loading ? (
          <PageLoader label="Loading users..." />
        ) : users.length === 0 ? (
          /* Empty State */
          <div className="rounded-xl border border-[#dcdddf] bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-[#6b7280]">No users found.</p>
            <button
              type="button"
              onClick={() => navigate("/manager-users/new")}
              className="mt-4 text-sm font-medium text-[#1b496d] hover:text-[#3d8086] transition-colors"
            >
              Invite your first member
            </button>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto rounded-xl border border-[#dcdddf] bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f2f2f2] text-left text-xs font-semibold text-[#1b496d] uppercase tracking-wide">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4 w-20 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => {
                  const isEditingRole = roleEditingUser === user._id;

                  return (
                    <tr
                      key={user._id}
                      className={`border-t border-[#f2f2f2] hover:bg-[#f2f2f2]/50 transition-colors ${
                        index % 2 ? "bg-white" : "bg-[#f2f2f2]/20"
                      }`}
                    >
                      {/* Name */}
                      <td className="p-4">
                        <p className="font-medium text-[#6b7280]">{user.name}</p>
                      </td>

                      {/* Email */}
                      <td className="p-4 text-[#6b7280]">{user.email}</td>

                      {/* Role */}
                      <td className="p-4">
                        {isEditingRole ? (
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user, e.target.value)}
                            autoFocus
                            className="rounded-lg border border-[#d6d9e2] bg-white px-3 py-1.5 text-sm text-[#1b3040] outline-none focus:border-[#3d8086] focus:ring-2 focus:ring-[#3d8086]/15"
                          >
                            <option value="member">Member</option>
                            <option value="manager">Manager</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              user.role === "manager"
                                ? "bg-[#caf19c]/60 text-[#1b496d]"
                                : "bg-[#1b496d]/10 text-[#1b496d]"
                            }`}
                          >
                            {user.role === "manager" ? "Manager" : "Member"}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <ReportActionsMenu actions={getActions(user)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}