import {
    FileText,
    CheckCircle2,
    MessageSquareText,
} from "lucide-react";

const activities = [
    {
        id: 1,
        type: "submitted",
        title: "John Silva submitted a weekly report",
        time: "2 hours ago",
    },
    {
        id: 2,
        type: "approved",
        title: "Sarah Perera's report was approved",
        time: "5 hours ago",
    },
    {
        id: 3,
        type: "correction",
        title: "Alex Fernando's report was sent back for correction",
        time: "1 day ago",
    },
    {
        id: 4,
        type: "submitted",
        title: "Emma Wilson submitted a weekly report",
        time: "1 day ago",
    },
    {
        id: 5,
        type: "approved",
        title: "John Silva's previous report was approved",
        time: "2 days ago",
    },
];

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

const RecentActivity = () => {
    return (
        <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm">
            <div className="border-b border-[#dcdddf] px-5 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                    Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                    Recent report submissions and review actions
                </p>
            </div>

            <div className="divide-y divide-gray-100">
                {activities.map((activity) => {
                    const config = activityConfig[activity.type];
                    const Icon = config.icon;

                    return (
                        <div
                            key={activity.id}
                            className="flex items-center gap-4 px-5 py-4"
                        >
                            <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.className}`}
                            >
                                <Icon size={17} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                    {activity.title}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    {activity.time}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentActivity;