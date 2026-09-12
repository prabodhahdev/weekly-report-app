const WeeklySummaryMemberCard = ({
    member,
    content,
    section,
}) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h3 className="font-semibold text-gray-900">
                    {member?.name || "Unknown Member"}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                    {member?.email}
                </p>
            </div>

            <div className="border-t border-gray-100 pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                    {section}
                </p>

                {Array.isArray(content) ? (
                    content.length > 0 ? (
                        <ul className="space-y-2">
                            {content.map((item, index) => (
                                <li
                                    key={index}
                                    className="text-sm leading-6 text-gray-700"
                                >
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400">
                            No information provided.
                        </p>
                    )
                ) : (
                    <p className="text-sm leading-6 text-gray-700">
                        {content || "No information provided."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default WeeklySummaryMemberCard;