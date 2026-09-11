import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "../../../components/ProjectForm";

export default function EditProject() {
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
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectResponse, usersResponse] = await Promise.all([
                    fetch(`http://localhost:8000/api/projects/${id}`, {
                        credentials: "include",
                    }),
                    fetch("http://localhost:8000/api/auth/users", {
                        credentials: "include",
                    }),
                ]);

                const projectData = await projectResponse.json();
                const usersData = await usersResponse.json();

                if (!projectResponse.ok) {
                    throw new Error(
                        projectData.message || "Failed to fetch project"
                    );
                }

                if (!usersResponse.ok) {
                    throw new Error(
                        usersData.message || "Failed to fetch users"
                    );
                }

                setFormData({
                    name: projectData.project.name || "",
                    description: projectData.project.description || "",
                    members:
                        projectData.project.members?.map(
                            (member) => member._id
                        ) || [],
                    isActive: projectData.project.isActive ?? true,
                });

                setMembers(usersData.users || []);
            } catch (error) {
                console.error("Fetch edit project data error:", error);
                toast.error(
                    error.message || "Failed to load project"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "isActive"
                    ? value === "true"
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        try {
            const response = await fetch(
                `http://localhost:8000/api/projects/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: formData.name,
                        description: formData.description,
                        members: formData.members,
                        isActive: formData.isActive,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update project"
                );
            }

            toast.success("Project updated successfully");
            navigate("/manager-projects");
        } catch (error) {
            console.error("Update project error:", error);
            toast.error(
                error.message || "Failed to update project"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 text-sm text-gray-500">
                Loading project...
            </div>
        );
    }

    return (
        <ProjectForm
            mode="edit"
            formData={formData}
            members={members}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/manager-projects")}
            loading={saving}
        />
    );
}