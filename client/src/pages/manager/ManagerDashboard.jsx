
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    FileCheck2,
    Percent,
    AlertTriangle,
    CircleAlert,
} from "lucide-react";

import DashboardStatCard from "../../components/dashboard/DashboardStatCard";
import TasksCompletedChart from "../../components/dashboard/TasksCompletedChart";
import ReportStatusChart from "../../components/dashboard/ReportStatusChart";
import ProjectWorkloadChart from "../../components/dashboard/ProjectWorkloadChart";
import TaskTypeTimeChart from "../../components/dashboard/TaskTypeTimeChart";
import RecentActivity from "../../components/dashboard/RecentActivity";
import apiFetch from "../../api/apiFetch";

const ManagerDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    async function fetchDashboardData() {
        try {
            setLoading(true);

            const response = await apiFetch("/api/reports");

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load dashboard data"
                );
            }

            setReports(data.reports || []);

        } catch (error) {
            console.error(
                "Fetch dashboard data error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load dashboard data"
            );

        } finally {
            setLoading(false);
        }
    }

    // Reports submitted this week
    function getReportsSubmittedThisWeek() {
        const now = new Date();

        const startOfWeek = new Date(now);
        const day = startOfWeek.getDay();

        const diff = day === 0 ? -6 : 1 - day;

        startOfWeek.setDate(
            startOfWeek.getDate() + diff
        );

        startOfWeek.setHours(0, 0, 0, 0);

        return reports.filter((report) => {
            if (!report.currentVersion?.submittedAt) {
                return false;
            }

            const submittedAt = new Date(
                report.currentVersion.submittedAt
            );

            return submittedAt >= startOfWeek;
        }).length;
    }

    // Report status counts
    const submittedCount = reports.filter(
        (report) =>
            report.status === "submitted"
    ).length;

    const approvedCount = reports.filter(
        (report) =>
            report.status === "approved"
    ).length;

    const correctionCount = reports.filter(
        (report) =>
            report.status === "needs_correction"
    ).length;

    const draftCount = reports.filter(
        (report) =>
            report.status === "draft"
    ).length;

    // Compliance rate
    const reviewedReports =
        approvedCount + correctionCount;

    const complianceRate =
        reviewedReports > 0
            ? Math.round(
                (approvedCount /
                    reviewedReports) *
                100
            )
            : 0;

    // Open blockers
    const openBlockers = reports.reduce(
        (total, report) => {
            const blockers =
                report.currentVersion?.blockers ||
                [];

            return (
                total +
                blockers.filter(
                    (blocker) =>
                        blocker.isKey
                ).length
            );
        },
        0
    );

    const reportsSubmittedThisWeek =
        getReportsSubmittedThisWeek();

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">

                <div className="mb-6">
                    <h1 className="text-xl lg:text-3xl font-bold text-[#518a88]">
                        Welcome Back!
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Overview of team reports, workload, and recent activity.
                    </p>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <DashboardStatCard
                        title="Reports Submitted"
                        value={reportsSubmittedThisWeek}
                        description="This week"
                        icon={FileCheck2}
                        variant="teal"
                    />

                    <DashboardStatCard
                        title="Compliance Rate"
                        value={`${complianceRate}%`}
                        description="Approved vs reports needing correction"
                        icon={Percent}
                        variant="navy"
                    />

                    <DashboardStatCard
                        title="Needs Correction"
                        value={correctionCount}
                        description="Reports awaiting resubmission"
                        icon={AlertTriangle}
                        variant="navyDeep"
                    />

                    <DashboardStatCard
                        title="Open Blockers"
                        value={openBlockers}
                        description="Key blockers across the team"
                        icon={CircleAlert}
                        variant="mint"
                    />

                </div>

                {/* Charts */}
                <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

                    <TasksCompletedChart
                        reports={reports}
                    />

                    <ReportStatusChart
                        reports={reports}
                    />

                    <ProjectWorkloadChart
                        reports={reports}
                    />

                    <TaskTypeTimeChart
                        reports={reports}
                    />

                </div>

                {/* Recent Activity */}
                <div className="mt-6">
                    <RecentActivity
                        reports={reports}
                    />
                </div>

            </div>
        </div>
    );
};

export default ManagerDashboard;

