import { Plus, Trash2 } from "lucide-react";

export default function FlaggableList({ items, onChange, disabled, flagLabel, placeholder }) {
  function updateText(id, text) { onChange(items.map((i) => (i.id === id ? { ...i, text } : i))); }
  function setFlag(id) { onChange(items.map((i) => ({ ...i, isKey: i.id === id }))); }
  function addItem() { onChange([...items, { id: crypto.randomUUID(), text: "", isKey: items.length === 0 }]); }
  function removeItem(id) { onChange(items.filter((i) => i.id !== id)); }

  return (
    <div className="space-y-2">
      {items.length === 0 && <p className="text-sm text-gray-400 italic">Nothing added yet.</p>}

      {items.map((item) => (
        <div key={item.id} className={`flex items-start gap-2 p-2 rounded-lg transition-colors ${item.isKey ? "bg-indigo-50/60" : ""}`}>
          <label className="flex items-center gap-1.5 pt-2.5 text-xs text-gray-500 shrink-0">
            <input type="radio" name={`flag-${flagLabel}`} checked={item.isKey} disabled={disabled}
              onChange={() => setFlag(item.id)} className="accent-indigo-600 w-3.5 h-3.5" />
            {flagLabel}
          </label>
          <input value={item.text} disabled={disabled} placeholder={placeholder}
            onChange={(e) => updateText(item.id, e.target.value)}
            className="flex-1 h-10 rounded-lg border border-gray-300 px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-white" />
          {!disabled && (
            <button type="button" onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-600 mt-2.5" aria-label="Remove item">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      {!disabled && (
        <button type="button" onClick={addItem}
          className="inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors">
          <Plus size={15} /> Add item
        </button>
      )}
    </div>
  );
}