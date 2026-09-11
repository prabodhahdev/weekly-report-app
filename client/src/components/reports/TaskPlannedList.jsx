import { Plus, Trash2 } from "lucide-react";

export default function TasksPlannedList({
    items,
    onChange,
    disabled
}) {
    function updateItem(id, taskName) {
        onChange(
            items.map((item) =>
                item.id === id
                    ? { ...item, taskName }
                    : item
            )
        );
    }

    function addItem() {
        onChange([
            ...items,
            {
                id: crypto.randomUUID(),
                taskName: ""
            }
        ]);
    }

    function removeItem(id) {
        onChange(
            items.filter((item) => item.id !== id)
        );
    }

    return (
        <div className="space-y-2">
            {items.length === 0 && (
                <p className="text-sm text-gray-400 italic">
                    Nothing planned yet.
                </p>
            )}

            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center gap-2"
                >
                    <input
                        value={item.taskName}
                        disabled={disabled}
                        placeholder="e.g. Start payment integration testing"
                        onChange={(e) =>
                            updateItem(
                                item.id,
                                e.target.value
                            )
                        }
                        className="flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                    />

                    {!disabled && (
                        <button
                            type="button"
                            onClick={() =>
                                removeItem(item.id)
                            }
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Remove item"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            ))}

            {!disabled && (
                <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors"
                >
                    <Plus size={15} />
                    Add item
                </button>
            )}
        </div>
    );
}