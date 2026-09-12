import { ArrowLeft, Save, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function ProjectForm({
    mode = "add",
    formData,
    members = [],
    onChange,
    onSubmit,
    onCancel,
    loading = false,
}) {
    const [search, setSearch] = useState("");

    const isView = mode === "view";
    const isEdit = mode === "edit";

    const title = isView
        ? "Project Details"
        : isEdit
            ? "Edit Project"
            : "Add Project";

    const description = isView
        ? "View project information and assigned members."
        : isEdit
            ? "Update the project information."
            : "Create a new project for team reports.";

    const selectedMemberIds = formData.members || [];

    const filteredMembers = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) {
            return members;
        }

        return members.filter(
            (member) =>
                member.name?.toLowerCase().includes(value) ||
                member.email?.toLowerCase().includes(value),
        );
    }, [members, search]);

    const toggleMember = (memberId) => {
        if (isView) return;

        const alreadySelected = selectedMemberIds.includes(memberId);

        const updatedMembers = alreadySelected
            ? selectedMemberIds.filter((id) => id !== memberId)
            : [...selectedMemberIds, memberId];

        onChange({
            target: {
                name: "members",
                value: updatedMembers,
            },
        });
    };

    const removeMember = (memberId) => {
        onChange({
            target: {
                name: "members",
                value: selectedMemberIds.filter((id) => id !== memberId),
            },
        });
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
                {/* Header */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="mb-4 inline-flex bg-[#1b496dba] py-1 px-2 items-center gap-2 text-sm text-white rounded-full cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <h1 className="text-lg font-semibold text-[#1b496d]">{title}</h1>

                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="max-w-3xl rounded-xl border border-[#dcdddf] bg-white shadow-sm"
                >
                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Project Information
                        </h2>
                    </div>

                    <div className="space-y-5 p-5">
                        {/* Project Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Project Name
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={onChange}
                                placeholder="Enter project name"
                                required
                                disabled={isView || loading}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50 disabled:text-gray-600"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                placeholder="Brief description of the project"
                                rows={5}
                                disabled={isView || loading}
                                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50 disabled:text-gray-600"
                            />
                        </div>

                        {/* Assign Members */}
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Assign Members
                            </label>

                            {/* Selected Members */}
                            {selectedMemberIds.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {selectedMemberIds.map((memberId) => {
                                        const member = members.find(
                                            (item) => item._id === memberId,
                                        );

                                        if (!member) return null;

                                        return (
                                            <div
                                                key={memberId}
                                                className="inline-flex items-center gap-2 rounded-full bg-[#1b496d]/10 px-3 py-1.5 text-xs text-[#1b496d]"
                                            >
                                                <span>{member.name}</span>

                                                {!isView && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMember(memberId)}
                                                        className="hover:text-red-500"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* View Mode */}
                            {isView ? (
                                selectedMemberIds.length === 0 ? (
                                    <p className="text-sm text-gray-400">No members assigned.</p>
                                ) : null
                            ) : (
                                <>
                                    {/* Search */}
                                    <div className="relative">
                                        <Search
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search by name or email..."
                                            disabled={loading}
                                            className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50"
                                        />
                                    </div>

                                    {/* Member Results */}
                                    <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-gray-200">
                                        {filteredMembers.length === 0 ? (
                                            <p className="px-3 py-4 text-center text-sm text-gray-400">
                                                No members found.
                                            </p>
                                        ) : (
                                            filteredMembers.map((member) => {
                                                const selected = selectedMemberIds.includes(member._id);

                                                return (
                                                    <button
                                                        key={member._id}
                                                        type="button"
                                                        onClick={() => toggleMember(member._id)}
                                                        className={`flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-gray-50 ${selected ? "bg-[#1b496d]/5" : ""
                                                            }`}
                                                    >
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-800">
                                                                {member.name}
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {member.email}
                                                            </p>
                                                        </div>

                                                        {selected && (
                                                            <span className="text-xs font-medium text-[#1b496d]">
                                                                Selected
                                                            </span>
                                                        )}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label
                                htmlFor="isActive"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>

                            {isView ? (
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${formData.isActive
                                            ? "bg-[#caf29a]/60 text-[#1b496d]"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {formData.isActive ? "Active" : "Inactive"}
                                </span>
                            ) : (
                                <select
                                    id="isActive"
                                    name="isActive"
                                    value={formData.isActive ? "true" : "false"}
                                    onChange={onChange}
                                    disabled={loading}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10 disabled:bg-gray-50"
                                >
                                    <option value="true">Active</option>

                                    <option value="false">Inactive</option>
                                </select>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    {!isView && (
                        <div className="flex items-center justify-end gap-3 border-t border-[#dcdddf] px-5 py-4">
                            <button
                                type="button"
                                onClick={onCancel}
                                disabled={loading}
                                className="rounded-lg border border-gray-300 cursor-pointer px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 cursor-pointer rounded-lg bg-[#1b496d] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3c8385] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save size={16} />

                                {loading
                                    ? "Saving..."
                                    : isEdit
                                        ? "Update Project"
                                        : "Save Project"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
