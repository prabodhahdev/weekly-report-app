import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Plus } from "lucide-react";
import { toast } from "react-toastify";

import PageLoader from "../../../components/ui/PageLoader.jsx";
import ReportActionsMenu from "../../../components/reports/ReportsActionsMenu.jsx";
import apiFetch from "../../../api/apiFetch.js";

export default function ManagerProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await apiFetch("/api/projects")
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

  function getActions(project) {
    return [
      {
        label: "View",
        icon: Eye,
        onClick: () => navigate(`/manager-projects/${project._id}`),
      },
      {
        label: "Edit",
        icon: Pencil,
        onClick: () => navigate(`/manager-projects/${project._id}/edit`),
      },
    ];
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div>
            <h1 className="text-lg font-semibold text-[#1b496d]">Projects</h1>
            <p className="mt-1 text-sm text-[#6b7280]">
              Manage projects used in weekly reports.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/manager-projects/new")}
            className="inline-flex items-center gap-1.5 h-10 cursor-pointer px-4 rounded-lg bg-[#1b496d] text-white text-sm font-medium hover:bg-[#153b58] transition-colors shadow-sm"
          >
            <Plus size={16} />
            Add Project
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <PageLoader label="Loading projects..." />
        ) : projects.length === 0 ? (
          /* Empty state */
          <div className="rounded-xl border border-[#dcdddf] bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-[#6b7280]">No projects found.</p>

            <button
              type="button"
              onClick={() => navigate("/manager-projects/new")}
              className="mt-4 text-sm font-medium text-[#1b496d] hover:text-[#3d8086] transition-colors"
            >
              Add your first project
            </button>
          </div>
        ) : (
          /* Projects table */
          <div className="overflow-x-auto rounded-xl border border-[#dcdddf] bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f2f2f2] text-left text-xs font-semibold text-[#1b496d] uppercase tracking-wide">
                  <th className="p-4">Project</th>
                  <th className="p-4">Members</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 w-20 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project, index) => (
                  <tr
                    key={project._id}
                    className={`border-t border-[#f2f2f2] hover:bg-[#f2f2f2]/50 transition-colors ${
                      index % 2 ? "bg-white" : "bg-[#f2f2f2]/20"
                    }`}
                  >
                    {/* Project */}
                    <td className="p-4">
                      <p className="font-medium text-[#6b7280]">{project.name}</p>
                      {project.description && (
                        <p className="mt-1 max-w-md truncate text-xs text-[#9ca3af]">
                          {project.description}
                        </p>
                      )}
                    </td>

                    {/* Members */}
                    <td className="p-4 text-[#6b7280]">
                      {project.members?.length || 0}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          project.isActive
                            ? "bg-[#caf19c]/60 text-[#1b496d]"
                            : "bg-[#dcdddf] text-[#6b7280]"
                        }`}
                      >
                        {project.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <ReportActionsMenu actions={getActions(project)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}