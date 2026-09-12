import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserForm from "@/components/users/UserForm";
import apiFetch from "@/api/apiFetch";

export default function AddUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "member",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await apiFetch(
                "/api/auth/users",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create user"
                );
            }

            toast.success(
                data.message || "User created successfully"
            );

            navigate("/manager-users");
        } catch (error) {
            console.error("Create user error:", error);

            toast.error(
                error.message || "Failed to create user"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/manager-users")}
            loading={loading}
        />
    );
}