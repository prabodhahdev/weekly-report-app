import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, MoreVertical, Pencil, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function ManagerProjects() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openMenu, setOpenMenu] = useState(null);

    const fetchProjects = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/projects",
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to fetch projects");
            }

            setProjects(data.projects || []);
        } catch (error) {
            console.error("Fetch projects error:", error);
            toast.error(error.message || "Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                    <div>
                        <h1 className="text-lg font-semibold text-[#1b496d]">
                            Projects
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage projects used in weekly reports.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/manager-projects/new")}
                        className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#1b496d] text-white text-sm font-medium hover:bg-[#3c8385] transition-colors shadow-sm"
                    >
                        <Plus size={16} />
                        Add Project
                    </button>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="py-12 text-center text-sm text-gray-500">
                        Loading projects...
                    </div>
                ) : projects.length === 0 ? (
                    /* Empty state */
                    <div className="rounded-xl border border-[#dcdddf] bg-white p-10 text-center shadow-sm">
                        <p className="text-sm text-gray-500">
                            No projects found.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/manager-projects/new")}
                            className="mt-4 text-sm font-medium text-[#1b496d] hover:text-[#3c8385]"
                        >
                            Add your first project
                        </button>
                    </div>
                ) : (
                    /* Projects table */
                    <div className="overflow-x-auto rounded-xl border border-[#dcdddf] bg-white shadow-sm">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#1b496d]/5 text-left text-xs font-medium text-[#1b496d]">
                                    <th className="p-4">Project</th>
                                    <th className="p-4">Members</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 w-20 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((project, index) => {
                                    const isOpen = openMenu === project._id;

                                    return (
                                        <tr
                                            key={project._id}
                                            className={
                                                index % 2
                                                    ? "bg-gray-50/50"
                                                    : "bg-white"
                                            }
                                        >
                                            {/* Project */}
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {project.name}
                                                    </p>

                                                    {project.description && (
                                                        <p className="mt-1 max-w-md truncate text-xs text-gray-500">
                                                            {project.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Members */}
                                            <td className="p-4 text-gray-600">
                                                {project.members?.length || 0}
                                            </td>

                                            {/* Status */}
                                            <td className="p-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                        project.isActive
                                                            ? "bg-[#caf29a]/60 text-[#1b496d]"
                                                            : "bg-gray-100 text-gray-500"
                                                    }`}
                                                >
                                                    {project.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="p-4">
                                                <div className="relative flex justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenMenu(
                                                                isOpen
                                                                    ? null
                                                                    : project._id
                                                            )
                                                        }
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#1b496d]"
                                                    >
                                                        <MoreVertical size={18} />
                                                    </button>

                                                    {isOpen && (
                                                        <div className="absolute right-0 top-9 z-20 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenMenu(null);
                                                                    navigate(
                                                                        `/manager-projects/${project._id}`
                                                                    );
                                                                }}
                                                                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                            >
                                                                <Eye size={16} />
                                                                View
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenMenu(null);
                                                                    navigate(
                                                                        `/manager-projects/${project._id}/edit`
                                                                    );
                                                                }}
                                                                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                                                            >
                                                                <Pencil size={16} />
                                                                Edit
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