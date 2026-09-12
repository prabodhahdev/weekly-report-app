
import {
    FileText,
    CheckCircle2,
    MessageSquareText,
} from "lucide-react";

const activityConfig = {
    submitted: {
        icon: FileText,
        className: "bg-[#1b496d]/10 text-[#1b496d]",
    },
    approved: {
        icon: CheckCircle2,
        className: "bg-[#00df82]/10 text-[#008f5a]",
    },
    correction: {
        icon: MessageSquareText,
        className: "bg-red-50 text-red-600",
    },
};

const RecentActivity = ({ reports = [] }) => {

    const activities = [...reports]
        .sort(
            (a, b) =>
                new Date(b.updatedAt) -
                new Date(a.updatedAt)
        )
        .slice(0, 5)
        .map((report) => {

            let type = "submitted";
            let title = "";

            const memberName =
                report.member?.name || "A team member";

            if (report.status === "approved") {
                type = "approved";

                title =
                    `${memberName}'s report was approved`;
            } else if (
                report.status === "needs_correction"
            ) {
                type = "correction";

                title =
                    `${memberName}'s report was sent back for correction`;
            } else if (
                report.status === "submitted"
            ) {
                type = "submitted";

                title =
                    `${memberName} submitted a weekly report`;
            } else {
                type = "submitted";

                title =
                    `${memberName} updated a weekly report`;
            }

            return {
                id: report._id,
                type,
                title,
                time: getRelativeTime(
                    report.updatedAt
                ),
            };
        });

    function getRelativeTime(date) {
        if (!date) {
            return "";
        }

        const now = new Date();
        const activityDate = new Date(date);

        const difference =
            now - activityDate;

        const seconds =
            Math.floor(
                difference / 1000
            );

        const minutes =
            Math.floor(
                seconds / 60
            );

        const hours =
            Math.floor(
                minutes / 60
            );

        const days =
            Math.floor(
                hours / 24
            );

        if (seconds < 60) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes} ${minutes === 1
                ? "minute"
                : "minutes"
                } ago`;
        }

        if (hours < 24) {
            return `${hours} ${hours === 1
                ? "hour"
                : "hours"
                } ago`;
        }

        if (days < 7) {
            return `${days} ${days === 1
                ? "day"
                : "days"
                } ago`;
        }

        return activityDate.toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    }

    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm">

            <div className="border-b border-[#dcdddf] px-5 py-4">
                <h2 className="text-lg font-semibold text-[#1b496d]">
                    Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Recent report submissions and review actions
                </p>
            </div>

            <div className="divide-y divide-gray-100">

                {activities.length > 0 ? (
                    activities.map(
                        (activity) => {

                            const config =
                                activityConfig[
                                activity.type
                                ];

                            const Icon =
                                config.icon;

                            return (
                                <div key={activity.id} className="flex items-center gap-4 px-5 py-4">
                                    <div
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.className}`}
                                    >
                                        <Icon
                                            size={17}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="text-sm font-medium text-[#1b496d] truncate">
                                            {
                                                activity.title
                                            }
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            {
                                                activity.time
                                            }
                                        </p>

                                    </div>
                                </div>
                            );
                        }
                    )
                ) : (
                    <div className="px-5 py-10 text-center">
                        <p className="text-sm text-gray-500">
                            No recent activity.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RecentActivity;
