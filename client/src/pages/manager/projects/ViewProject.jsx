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
        isActive: true,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await apiFetch(`/api/projects/${id}`);

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch project"
                    );
                }

                setFormData({
                    name: data.project.name || "",
                    description: data.project.description || "",
                    isActive: data.project.isActive,
                });
            } catch (error) {
                console.error("Fetch project error:", error);
                toast.error(error.message || "Failed to load project");
                navigate("/manager-projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
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
            onChange={() => {}}
            onSubmit={(e) => e.preventDefault()}
            onCancel={() => navigate("/manager-projects")}
        />
    );
}