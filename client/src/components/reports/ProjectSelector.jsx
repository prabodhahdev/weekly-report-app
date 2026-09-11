import { useEffect, useState } from "react";

export default function ProjectSelect({
    value,
    onChange,
    disabled
}) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/projects/my-projects",
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load projects"
                    );
                }

                setProjects(data.projects || []);

            } catch (error) {
                console.error(
                    "Fetch assigned projects error:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <select
            value={value}
            disabled={disabled || loading}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
        >
            <option value="">
                {loading
                    ? "Loading projects..."
                    : "Select a project"}
            </option>

            {projects.map((project) => (
                <option
                    key={project._id}
                    value={project._id}
                >
                    {project.name}
                </option>
            ))}
        </select>
    );
}