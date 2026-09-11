import { ArrowLeft, Save } from "lucide-react";

export default function UserForm({
    formData,
    onChange,
    onSubmit,
    onCancel,
    loading = false,
}) {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                <div className="mb-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1b496d]"
                    >
                        <ArrowLeft size={16} />
                        Back to User Management
                    </button>

                    <h1 className="text-lg font-semibold text-[#1b496d]">
                        Invite Member
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Create a new user account for a team member.
                    </p>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="max-w-3xl rounded-xl border border-[#dcdddf] bg-white shadow-sm"
                >
                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                            User Information
                        </h2>
                    </div>

                    <div className="space-y-5 p-5">

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Enter name"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={onChange}
                                placeholder="Enter email address"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50"
                            />
                        </div>

                        {/* Temporary Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Temporary Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={onChange}
                                placeholder="Enter temporary password"
                                required
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50"
                            />

                            <p className="mt-1.5 text-xs text-gray-400">
                                Share this temporary password with the user.
                            </p>
                        </div>

                        {/* Role */}
                        <div>
                            <label
                                htmlFor="role"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Role
                            </label>

                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={onChange}
                                disabled={loading}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50"
                            >
                                <option value="member">Member</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-[#dcdddf] px-5 py-4">

                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#1b496d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3c8385] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save size={16} />

                            {loading ? "Creating..." : "Invite Member"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}