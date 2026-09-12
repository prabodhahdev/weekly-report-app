import { useEffect, useState } from "react";
import FilterSelect from "../ui/FilterSelect";
import apiFetch from "../../api/apiFetch";

const getStatuses = (role) => {
    if (role === "manager") {
        return [
            { value: "", label: "All statuses" },
            { value: "submitted", label: "Submitted" },
            { value: "needs_correction", label: "Needs Correction" },
            { value: "approved", label: "Approved" },
        ];
    }

    return [
        { value: "", label: "All statuses" },
        { value: "draft", label: "Draft" },
        { value: "submitted", label: "Submitted" },
        { value: "needs_correction", label: "Needs Correction" },
        { value: "approved", label: "Approved" },
    ];
};

const dateFieldClass =
    "h-10 rounded-lg border border-[#d6d9e2] px-3 text-sm text-[#656e79] bg-white outline-none transition-colors focus:ring-2 focus:ring-[#3d8086] focus:border-[#3d8086]";

export default function ReportsFilterBar({
    filters,
    onChange,
    members,
    role
}) {
    const [projects, setProjects] = useState([]);

    const STATUSES = getStatuses(role);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiFetch(
                    role === "manager"
                        ? "/api/projects"
                        : "/api/projects/my-projects"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load projects"
                    );
                }

                setProjects(data.projects || []);

            } catch (error) {
                console.error(
                    "Fetch projects error:",
                    error
                );
            }
        };

        fetchProjects();
    }, [role]);

    function update(field, value) {
        onChange({
            ...filters,
            [field]: value
        });
    }

    const hasActiveFilters =
        filters.project ||
        filters.status ||
        filters.from ||
        filters.to ||
        filters.member;

    return (
        <div className="flex flex-wrap items-center gap-3">

            {members && (
                <FilterSelect
                    value={filters.member || ""}
                    onChange={(e) =>
                        update(
                            "member",
                            e.target.value
                        )
                    }
                    ariaLabel="Filter by member"
                >
                    <option value="">
                        All members
                    </option>

                    {members.map((m) => (
                        <option
                            key={m}
                            value={m}
                        >
                            {m}
                        </option>
                    ))}
                </FilterSelect>
            )}

            <FilterSelect
                value={filters.project}
                onChange={(e) =>
                    update(
                        "project",
                        e.target.value
                    )
                }
                ariaLabel="Filter by project"
            >
                <option value="">
                    All projects
                </option>

                {projects.map((project) => (
                    <option
                        key={project._id}
                        value={project._id}
                    >
                        {project.name}
                    </option>
                ))}
            </FilterSelect>

            <FilterSelect
                value={filters.status}
                onChange={(e) =>
                    update(
                        "status",
                        e.target.value
                    )
                }
                ariaLabel="Filter by status"
            >
                {STATUSES.map((status) => (
                    <option
                        key={status.value}
                        value={status.value}
                    >
                        {status.label}
                    </option>
                ))}
            </FilterSelect>

            <input
                type="date"
                value={filters.from}
                onChange={(e) =>
                    update(
                        "from",
                        e.target.value
                    )
                }
                className={dateFieldClass}
                aria-label="From date"
            />

            <span className="text-sm text-[#9ca3af]">
                to
            </span>

            <input
                type="date"
                value={filters.to}
                onChange={(e) =>
                    update(
                        "to",
                        e.target.value
                    )
                }
                className={dateFieldClass}
                aria-label="To date"
            />

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={() =>
                        onChange({
                            project: "",
                            status: "",
                            from: "",
                            to: "",
                            member: ""
                        })
                    }
                    className="text-sm font-medium text-[#3d8086] hover:text-[#2f6367]"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}