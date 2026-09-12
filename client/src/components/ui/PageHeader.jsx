export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <div>
        <h1 className="text-lg font-semibold text-[#1b496d]">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
