import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

import StatusBanner from "./ReportStatusBadge.jsx";

function formatRange(weekStart, weekEnd) {
    const opts = {
        month: "short",
        day: "numeric",
    };

    const start = new Date(
        weekStart
    ).toLocaleDateString(undefined, opts);

    const end = new Date(
        weekEnd
    ).toLocaleDateString(undefined, opts);

    return `${start} – ${end}`;
}

export default function ReportsTable({
    reports,
    showMember,
    getActions,
}) {
    const [openMenu, setOpenMenu] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpenMenu(null);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    if (reports.length === 0) {
        return (
            <div className="py-12 text-center text-sm text-gray-400 italic">
                No reports match these filters.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">

            <table className="w-full text-sm">

                <thead>
                    <tr className="bg-[#1b496d]/5 text-left text-xs font-medium text-[#1b496d]">

                        {showMember && (
                            <th className="p-3">
                                Member
                            </th>
                        )}

                        <th className="p-3">
                            Week
                        </th>

                        <th className="p-3">
                            Project
                        </th>

                        <th className="p-3">
                            Status
                        </th>

                        <th className="p-3">
                            Last updated
                        </th>

                        <th className="p-3 w-16 text-center">
                            Actions
                        </th>

                    </tr>
                </thead>


                <tbody>

                    {reports.map((r, i) => {

                        const actions =
                            getActions(r);

                        const reportId =
                            r._id || r.id;

                        const isOpen =
                            openMenu === reportId;

                        const projectName =
                            typeof r.project === "object"
                                ? r.project?.name
                                : r.project;

                        const memberName =
                            typeof r.member === "object"
                                ? r.member?.name
                                : r.memberName;

                        return (
                            <tr
                                key={reportId}
                                className={
                                    i % 2
                                        ? "bg-gray-50/50"
                                        : "bg-white"
                                }
                            >

                                {showMember && (
                                    <td className="p-3 font-medium text-gray-900">
                                        {memberName || "-"}
                                    </td>
                                )}


                                <td className="p-3 font-medium text-gray-900">
                                    {formatRange(
                                        r.weekStart,
                                        r.weekEnd
                                    )}
                                </td>


                                <td className="p-3 text-gray-600">
                                    {projectName || "-"}
                                </td>


                                <td className="p-3">
                                    <StatusBanner
                                        status={r.status}
                                    />
                                </td>


                                <td className="p-3 text-gray-500">
                                    {r.updatedAt
                                        ? new Date(
                                              r.updatedAt
                                          ).toLocaleDateString()
                                        : "-"}
                                </td>


                                <td className="p-3">

                                    <div
                                        className="relative flex justify-center"
                                        ref={
                                            isOpen
                                                ? menuRef
                                                : null
                                        }
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenu(
                                                    isOpen
                                                        ? null
                                                        : reportId
                                                )
                                            }
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#1b496d] transition-colors"
                                            aria-label="Report actions"
                                        >
                                            <MoreVertical
                                                size={18}
                                            />
                                        </button>


                                        {isOpen && (
                                            <div className="absolute right-0 top-9 z-20 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">

                                                {actions.map(
                                                    (action) => {

                                                        const Icon =
                                                            action.icon;

                                                        return (
                                                            <button
                                                                key={
                                                                    action.label
                                                                }
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenMenu(
                                                                        null
                                                                    );

                                                                    action.onClick();
                                                                }}
                                                                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1b496d]"
                                                            >
                                                                <Icon
                                                                    size={
                                                                        16
                                                                    }
                                                                    className="shrink-0"
                                                                />

                                                                <span>
                                                                    {
                                                                        action.label
                                                                    }
                                                                </span>
                                                            </button>
                                                        );
                                                    }
                                                )}

                                            </div>
                                        )}

                                    </div>

                                </td>

                            </tr>
                        );
                    })}

                </tbody>

            </table>

        </div>
    );
}