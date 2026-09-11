import { useState } from "react";
import ViewReport from "../../components/reports/view-report/ViewReport";
import VersionHistory from "../../components/reports/view-report/VersionHistory";

const ViewReportPage = () => {
    const versions = [
        {
            id: "version-3",
            versionNumber: 3,
            status: "Submitted",
            submittedAt: "2026-09-11T10:30:00",
            content: {
                memberName: "Prabodha Harshani",
                project: "Weekly Report System",
                status: "Submitted",
                startDate: "Sep 08, 2026",
                endDate: "Sep 14, 2026",

                highlights: [
                    {
                        text: "Completed the authentication module",
                        isKeyAchievement: true,
                    },
                    {
                        text: "Fixed responsive dashboard issues",
                    },
                    {
                        text: "Added report filtering functionality",
                    },
                ],

                completedTasks: [
                    {
                        id: 1,
                        taskName: "Develop authentication module",
                        priority: "High",
                        plannedPercentage: 100,
                        actualPercentage: 100,
                        status: "Completed",
                        timePlanned: 6,
                        timeSpent: 5,
                        output:
                            "Login, registration and logout functionality",
                    },
                    {
                        id: 2,
                        taskName: "Build manager dashboard",
                        priority: "High",
                        plannedPercentage: 80,
                        actualPercentage: 75,
                        status: "Completed",
                        timePlanned: 8,
                        timeSpent: 7,
                        output:
                            "Responsive manager dashboard UI",
                    },
                ],

                nextWeekTasks: [
                    {
                        id: 1,
                        taskName: "Complete user profile page",
                    },
                    {
                        id: 2,
                        taskName: "Implement manager review workflow",
                    },
                    {
                        id: 3,
                        taskName: "Perform final application testing",
                    },
                ],

                blockers: [
                    {
                        id: 1,
                        text:
                            "Waiting for final API requirements from the backend team.",
                        isKeyIssue: true,
                    },
                ],

                challenges: [
                    {
                        id: 1,
                        text:
                            "Understanding the existing authentication flow.",
                    },
                    {
                        id: 2,
                        text:
                            "Handling responsive layouts across different screen sizes.",
                    },
                ],

                hoursBreakdown: [
                    {
                        id: 1,
                        taskType: "Development",
                        hours: 20,
                    },
                    {
                        id: 2,
                        taskType: "Testing",
                        hours: 5,
                    },
                    {
                        id: 3,
                        taskType: "Meetings",
                        hours: 4,
                    },
                    {
                        id: 4,
                        taskType: "Documentation",
                        hours: 3,
                    },
                ],

                notes:
                    "Completed the main development tasks for this week. The remaining API integration work will be continued next week.",

                managerFeedback: {
                    comment:
                        "Good progress this week. Please prioritize the API integration and complete the remaining testing tasks.",
                    manager: {
                        name: "John Perera",
                    },
                },
            },
        },

        {
            id: "version-2",
            versionNumber: 2,
            status: "Needs Correction",
            submittedAt: "2026-09-10T15:20:00",
            content: {
                memberName: "Prabodha Harshani",
                project: "Weekly Report System",
                status: "Needs Correction",
                startDate: "Sep 08, 2026",
                endDate: "Sep 14, 2026",

                highlights: [
                    {
                        text: "Completed authentication module",
                    },
                    {
                        text: "Worked on dashboard UI",
                    },
                ],

                completedTasks: [
                    {
                        id: 1,
                        taskName: "Develop authentication module",
                        priority: "High",
                        plannedPercentage: 100,
                        actualPercentage: 90,
                        status: "Completed",
                        timePlanned: 6,
                        timeSpent: 5,
                        output: "Authentication module",
                    },
                ],

                nextWeekTasks: [
                    {
                        id: 1,
                        taskName: "Complete dashboard",
                    },
                ],

                blockers: [
                    {
                        id: 1,
                        text: "Waiting for API requirements.",
                        isKeyIssue: true,
                    },
                ],

                challenges: [
                    {
                        id: 1,
                        text: "Understanding authentication flow.",
                    },
                ],

                hoursBreakdown: [
                    {
                        id: 1,
                        taskType: "Development",
                        hours: 15,
                    },
                    {
                        id: 2,
                        taskType: "Testing",
                        hours: 3,
                    },
                ],

                notes: "Initial weekly report submission.",

                managerFeedback: {
                    comment:
                        "Please provide more details about completed tasks.",
                    manager: {
                        name: "John Perera",
                    },
                },
            },
        },

        {
            id: "version-1",
            versionNumber: 1,
            status: "Needs Correction",
            submittedAt: "2026-09-08T11:00:00",
            content: {
                memberName: "Prabodha Harshani",
                project: "Weekly Report System",
                status: "Needs Correction",
                startDate: "Sep 08, 2026",
                endDate: "Sep 14, 2026",

                highlights: [
                    {
                        text: "Started authentication module",
                    },
                ],

                completedTasks: [
                    {
                        id: 1,
                        taskName: "Project setup",
                        priority: "Medium",
                        plannedPercentage: 100,
                        actualPercentage: 100,
                        status: "Completed",
                        timePlanned: 3,
                        timeSpent: 3,
                        output: "Initial project setup",
                    },
                ],

                nextWeekTasks: [
                    {
                        id: 1,
                        taskName: "Develop authentication module",
                    },
                ],

                blockers: [],

                challenges: [
                    {
                        id: 1,
                        text: "Project setup issues.",
                    },
                ],

                hoursBreakdown: [
                    {
                        id: 1,
                        taskType: "Development",
                        hours: 3,
                    },
                ],

                notes: "First submission.",

                managerFeedback: {
                    comment:
                        "Please add more task details.",
                    manager: {
                        name: "John Perera",
                    },
                },
            },
        },
    ];

    const [selectedVersion, setSelectedVersion] = useState(
        versions[0]
    );

    const handleViewVersion = (version) => {
        setSelectedVersion(version);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
                {/* Report */}
                <main className="min-w-0 flex-1">
                    <ViewReport
                        report={selectedVersion.content}
                    />
                </main>

                {/* Versions */}
                <aside className="w-full lg:w-80 lg:shrink-0">
                    <VersionHistory
                        versions={versions}
                        selectedVersionId={selectedVersion.id}
                        onViewVersion={handleViewVersion}
                    />
                </aside>
            </div>
        </div>
    );
};

export default ViewReportPage;