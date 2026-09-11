import { Plus, Trash2 } from "lucide-react";

const PRIORITIES = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
];

const STATUSES = [
    { label: "Not started", value: "not_started" },
    { label: "In progress", value: "in_progress" },
    { label: "Done", value: "completed" },
];

function emptyTask() {
    return {
        id: crypto.randomUUID(),
        taskName: "",
        priority: "medium",
        plannedPercentage: "",
        actualPercentage: "",
        status: "not_started",
        plannedHours: "",
        spentHours: "",
        deliverable: "",
    };
}

const cellInput =
    "w-full h-9 rounded-md border border-gray-300 px-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50";

export default function TasksCompletedTable({
    tasks,
    onChange,
    disabled
}) {
    function updateTask(id, field, value) {
        onChange(
            tasks.map((t) =>
                t.id === id
                    ? { ...t, [field]: value }
                    : t
            )
        );
    }

    function addTask() {
        onChange([...tasks, emptyTask()]);
    }

    function removeTask(id) {
        onChange(
            tasks.filter((t) => t.id !== id)
        );
    }

    return (
        <div>
            {tasks.length === 0 && (
                <p className="text-sm text-gray-400 italic mb-3">
                    No tasks added yet.
                </p>
            )}

            {tasks.length > 0 && (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-indigo-50/60 text-left text-xs font-medium text-indigo-700">
                                <th className="p-3 min-w-[160px]">
                                    Task
                                </th>

                                <th className="p-3 min-w-[100px]">
                                    Priority
                                </th>

                                <th className="p-3 min-w-[130px]">
                                    Planned % / Actual %
                                </th>

                                <th className="p-3 min-w-[130px]">
                                    Status
                                </th>

                                <th className="p-3 min-w-[140px]">
                                    Time planned / spent (h)
                                </th>

                                <th className="p-3 min-w-[180px]">
                                    Output / deliverable
                                </th>

                                {!disabled && (
                                    <th className="p-3 w-10" />
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task, i) => (
                                <tr
                                    key={task.id}
                                    className={
                                        i % 2
                                            ? "bg-gray-50/50"
                                            : "bg-white"
                                    }
                                >
                                    <td className="p-2">
                                        <input
                                            value={task.taskName}
                                            disabled={disabled}
                                            placeholder="Task name"
                                            onChange={(e) =>
                                                updateTask(
                                                    task.id,
                                                    "taskName",
                                                    e.target.value
                                                )
                                            }
                                            className={cellInput}
                                        />
                                    </td>

                                    <td className="p-2">
                                        <select
                                            value={task.priority}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                updateTask(
                                                    task.id,
                                                    "priority",
                                                    e.target.value
                                                )
                                            }
                                            className={`${cellInput} bg-white`}
                                        >
                                            {PRIORITIES.map(
                                                (priority) => (
                                                    <option
                                                        key={
                                                            priority.value
                                                        }
                                                        value={
                                                            priority.value
                                                        }
                                                    >
                                                        {
                                                            priority.label
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </td>

                                    <td className="p-2">
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="number"
                                                value={
                                                    task.plannedPercentage
                                                }
                                                disabled={disabled}
                                                placeholder="0"
                                                onChange={(e) =>
                                                    updateTask(
                                                        task.id,
                                                        "plannedPercentage",
                                                        e.target.value
                                                    )
                                                }
                                                className={`${cellInput} w-16`}
                                            />

                                            <span className="text-gray-300">
                                                /
                                            </span>

                                            <input
                                                type="number"
                                                value={
                                                    task.actualPercentage
                                                }
                                                disabled={disabled}
                                                placeholder="0"
                                                onChange={(e) =>
                                                    updateTask(
                                                        task.id,
                                                        "actualPercentage",
                                                        e.target.value
                                                    )
                                                }
                                                className={`${cellInput} w-16`}
                                            />
                                        </div>
                                    </td>

                                    <td className="p-2">
                                        <select
                                            value={task.status}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                updateTask(
                                                    task.id,
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className={`${cellInput} bg-white`}
                                        >
                                            {STATUSES.map(
                                                (status) => (
                                                    <option
                                                        key={
                                                            status.value
                                                        }
                                                        value={
                                                            status.value
                                                        }
                                                    >
                                                        {
                                                            status.label
                                                        }
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </td>

                                    <td className="p-2">
                                        <div className="flex items-center gap-1.5">
                                            <input
                                                type="number"
                                                value={
                                                    task.plannedHours
                                                }
                                                disabled={disabled}
                                                placeholder="0"
                                                onChange={(e) =>
                                                    updateTask(
                                                        task.id,
                                                        "plannedHours",
                                                        e.target.value
                                                    )
                                                }
                                                className={`${cellInput} w-16`}
                                            />

                                            <span className="text-gray-300">
                                                /
                                            </span>

                                            <input
                                                type="number"
                                                value={
                                                    task.spentHours
                                                }
                                                disabled={disabled}
                                                placeholder="0"
                                                onChange={(e) =>
                                                    updateTask(
                                                        task.id,
                                                        "spentHours",
                                                        e.target.value
                                                    )
                                                }
                                                className={`${cellInput} w-16`}
                                            />
                                        </div>
                                    </td>

                                    <td className="p-2">
                                        <input
                                            value={
                                                task.deliverable
                                            }
                                            disabled={disabled}
                                            placeholder="e.g. PR #142 merged"
                                            onChange={(e) =>
                                                updateTask(
                                                    task.id,
                                                    "deliverable",
                                                    e.target.value
                                                )
                                            }
                                            className={cellInput}
                                        />
                                    </td>

                                    {!disabled && (
                                        <td className="p-2 text-center">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeTask(
                                                        task.id
                                                    )
                                                }
                                                className="text-gray-400 hover:text-red-600"
                                                aria-label="Remove task"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!disabled && (
                <button
                    type="button"
                    onClick={addTask}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                    <Plus size={15} />
                    Add task
                </button>
            )}
        </div>
    );
}