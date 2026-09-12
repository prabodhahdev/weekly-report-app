export default function Card({ title, icon: Icon, description, children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6 ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center gap-2 mb-1">
          {Icon && <Icon size={17} className="text-[#1b496d]" aria-hidden="true" />}
          {title && <h2 className="text-sm font-semibold text-[#1b496d]">{title}</h2>}
        </div>
      )}
      {description && (
        <p className="text-xs text-gray-400 mb-4">{description}</p>
      )}
      <div className={description || title ? "mt-4" : ""}>{children}</div>
    </div>
  )
}