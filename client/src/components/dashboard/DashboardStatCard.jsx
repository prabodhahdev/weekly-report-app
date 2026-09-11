const DashboardStatCard = ({
    title,
    value,
    description,
    icon: Icon,
    iconClassName = "bg-[#1b496d]/10 text-[#1b496d]",
}) => {
    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#1b496d]">
                        {value}
                    </h3>

                    {description && (
                        <p className="mt-1 text-xs text-gray-500">
                            {description}
                        </p>
                    )}
                </div>

                {Icon && (
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
                    >
                        <Icon size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardStatCard;