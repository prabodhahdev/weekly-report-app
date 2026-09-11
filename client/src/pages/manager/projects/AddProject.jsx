import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectForm from "../../../components/ProjectForm";

export default function AddProject() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        members: [],
        isActive: true,
    });

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersLoading, setUsersLoading] = useState(true);

    useEffect(() => {
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

                setMembers(data.users || []);
            } catch (error) {
                console.error("Fetch users error:", error);
                toast.error(error.message || "Failed to load users");
            } finally {
                setUsersLoading(false);
            }
        };

        fetchUsers();
    }, []);

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

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:8000/api/projects",
                {
                    method: "POST",
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
                    data.message || "Failed to create project"
                );
            }

            toast.success("Project created successfully");
            navigate("/manager-projects");
        } catch (error) {
            console.error("Create project error:", error);
            toast.error(error.message || "Failed to create project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProjectForm
            mode="add"
            formData={formData}
            members={members}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/manager-projects")}
            loading={loading || usersLoading}
        />
    );
}