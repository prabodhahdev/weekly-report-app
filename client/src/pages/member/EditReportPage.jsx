
import { useNavigate, useParams } from "react-router-dom";
import { Eye } from "lucide-react";

import WeeklyReportPage from "../WeeklyReportPage.jsx";

export default function EditMyReportPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Temporary hardcoded report
    // This will be replaced with the API later.
    const report = {
        id: id,

        weekStart: "2026-09-08",

        project: "Client A",

        tasksCompleted: [
            {
                task: "Developed login page",
                hours: "5",
            },
            {
                task: "Fixed dashboard bugs",
                hours: "3",
            },
        ],

        tasksPlanned: [
            {
                task: "Complete user profile page",
            },
            {
                task: "Test dashboard functionality",
            },
        ],

        blockers: [
            {
                text: "Waiting for API requirements",
                flagged: true,
            },
        ],

        achievements: [
            {
                text: "Completed authentication UI",
                flagged: true,
            },
        ],

        hours: {
            development: "20",
            testing: "5",
            meetings: "3",
            documentation: "2",
        },

        notes:
            "Frontend authentication work completed. Need to continue dashboard integration next week.",

        status: "needs_correction",

        managerComment:
            "Please add more details to the completed tasks and update the hours breakdown.",
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">

                {/* View shortcut */}
                <div className="px-4 sm:px-8 pt-5">
                    <button
                        type="button"
                        onClick={() => navigate(`/member-report/${id}`)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        <Eye size={16} />
                        View report
                    </button>
                </div>

                <WeeklyReportPage
                    initialReport={report}
                    editMode={true}
                />

            </div>
        </div>
    );
}
