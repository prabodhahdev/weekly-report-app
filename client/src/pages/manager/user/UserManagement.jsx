import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function UserManagement() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);
    const [roleEditingUser, setRoleEditingUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/auth/users",
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch users");
            }

            setUsers(data.users || []);
        } catch (error) {
            console.error("Fetch users error:", error);

            toast.error(
                error.message || "Failed to load users"
            );
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
            const response = await fetch(
                `http://localhost:8000/api/auth/users/${user._id}/role`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role: newRole,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update role"
                );
            }

            toast.success(
                data.message || "Role updated successfully"
            );

            setRoleEditingUser(null);

            fetchUsers();
        } catch (error) {
            console.error("Update role error:", error);

            toast.error(
                error.message || "Failed to update role"
            );
        }
    };

    const handleRemoveUser = async (user) => {
        const confirmed = window.confirm(
            `Are you sure you want to remove ${user.name}?`
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `http://localhost:8000/api/auth/users/${user._id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to remove user"
                );
            }

            toast.success(
                data.message || "User removed successfully"
            );

            setOpenMenu(null);
            setRoleEditingUser(null);

            fetchUsers();
        } catch (error) {
            console.error("Remove user error:", error);

            toast.error(
                error.message || "Failed to remove user"
            );
        }
    };

    return (
        <div className="w-full h-full flex flex-col">

            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">

                    <div>
                        <h1 className="text-lg font-semibold text-[#1b496d]">
                            User Management
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage team members and their roles.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/manager-users/new")
                        }
                        className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#1b496d] text-white text-sm font-medium hover:bg-[#3c8385] transition-colors shadow-sm"
                    >
                        <Plus size={16} />
                        Invite Member
                    </button>

                </div>

                {/* Loading */}
                {loading ? (
                    <div className="py-12 text-center text-sm text-gray-500">
                        Loading users...
                    </div>
                ) : users.length === 0 ? (

                    /* Empty State */
                    <div className="rounded-xl border border-[#dcdddf] bg-white p-10 text-center shadow-sm">

                        <p className="text-sm text-gray-500">
                            No users found.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/manager-users/new")
                            }
                            className="mt-4 text-sm font-medium text-[#1b496d] hover:text-[#3c8385]"
                        >
                            Invite your first member
                        </button>

                    </div>

                ) : (

                    /* Table */
                    <div className="overflow-x-auto rounded-xl border border-[#dcdddf] bg-white shadow-sm">

                        <table className="w-full text-sm">

                            <thead>
                                <tr className="bg-[#1b496d]/5 text-left text-xs font-medium text-[#1b496d]">

                                    <th className="p-4">
                                        Name
                                    </th>

                                    <th className="p-4">
                                        Email
                                    </th>

                                    <th className="p-4">
                                        Role
                                    </th>

                                    <th className="p-4 w-20 text-center">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user, index) => {

                                    const isOpen =
                                        openMenu === user._id;

                                    const isEditingRole =
                                        roleEditingUser === user._id;

                                    return (
                                        <tr
                                            key={user._id}
                                            className={
                                                index % 2
                                                    ? "bg-gray-50/50"
                                                    : "bg-white"
                                            }
                                        >

                                            {/* Name */}
                                            <td className="p-4">

                                                <p className="font-medium text-gray-900">
                                                    {user.name}
                                                </p>

                                            </td>

                                            {/* Email */}
                                            <td className="p-4 text-gray-600">
                                                {user.email}
                                            </td>

                                            {/* Role */}
                                            <td className="p-4">

                                                {isEditingRole ? (

                                                    <select
                                                        value={user.role}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user,
                                                                e.target.value
                                                            )
                                                        }
                                                        autoFocus
                                                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10"
                                                    >

                                                        <option value="member">
                                                            Member
                                                        </option>

                                                        <option value="manager">
                                                            Manager
                                                        </option>

                                                    </select>

                                                ) : (

                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                            user.role === "manager"
                                                                ? "bg-[#caf29a]/60 text-[#1b496d]"
                                                                : "bg-[#1b496d]/10 text-[#1b496d]"
                                                        }`}
                                                    >
                                                        {user.role === "manager"
                                                            ? "Manager"
                                                            : "Member"}
                                                    </span>

                                                )}

                                            </td>

                                            {/* Actions */}
                                            <td className="p-4">

                                                <div className="relative flex justify-center">

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setOpenMenu(
                                                                isOpen
                                                                    ? null
                                                                    : user._id
                                                            );

                                                            setRoleEditingUser(
                                                                null
                                                            );
                                                        }}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#1b496d]"
                                                    >
                                                        <MoreVertical
                                                            size={18}
                                                        />
                                                    </button>

                                                    {isOpen && (

                                                        <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">

                                                            {/* Change Role */}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setRoleEditingUser(
                                                                        user._id
                                                                    );

                                                                    setOpenMenu(
                                                                        null
                                                                    );
                                                                }}
                                                                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                            >

                                                                <Pencil
                                                                    size={16}
                                                                />

                                                                Change Role

                                                            </button>

                                                            {/* Remove User */}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveUser(
                                                                        user
                                                                    )
                                                                }
                                                                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                                            >

                                                                <Trash2
                                                                    size={16}
                                                                />

                                                                Remove User

                                                            </button>

                                                        </div>

                                                    )}

                                                </div>

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