import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ProjectForm from "@/components/projects/ProjectForm";
import apiFetch from "@/api/apiFetch";

export default function ViewProject() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        members: [],
        isActive: true,
    });

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    projectResponse,
                    usersResponse
                ] = await Promise.all([
                    apiFetch(`/api/projects/${id}`),
                    apiFetch("/api/auth/users"),
                ]);

                const projectData =
                    await projectResponse.json();

                const usersData =
                    await usersResponse.json();

                if (!projectResponse.ok) {
                    throw new Error(
                        projectData.message ||
                        "Failed to fetch project"
                    );
                }

                if (!usersResponse.ok) {
                    throw new Error(
                        usersData.message ||
                        "Failed to fetch users"
                    );
                }

                setFormData({
                    name:
                        projectData.project.name ||
                        "",
                    description:
                        projectData.project.description ||
                        "",
                    members:
                        projectData.project.members?.map(
                            (member) => member._id
                        ) || [],
                    isActive:
                        projectData.project.isActive ??
                        true,
                });

                setMembers(
                    usersData.users || []
                );

            } catch (error) {
                console.error(
                    "Fetch project data error:",
                    error
                );

                toast.error(
                    error.message ||
                    "Failed to load project"
                );

                navigate("/manager-projects");

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [id, navigate]);

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading project...
                </p>
            </div>
        );
    }

    return (
        <ProjectForm
            mode="view"
            formData={formData}
            members={members}
            onChange={() => {}}
            onSubmit={(e) =>
                e.preventDefault()
            }
            onCancel={() =>
                navigate("/manager-projects")
            }
        />
    );
}