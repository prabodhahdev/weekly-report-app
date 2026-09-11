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

const ManagerDashboard = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
                <div className="mb-6">
                    <h1 className="text-lg font-semibold text-[#1b496d]">
                        Manager Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Overview of team reports, workload, and recent activity.
                    </p>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardStatCard
                        title="Reports Submitted"
                        value="12"
                        description="This week"
                        icon={FileCheck2}
                        iconClassName="bg-[#1b496d]/10 text-[#1b496d]"
                    />

                    <DashboardStatCard
                        title="Compliance Rate"
                        value="86%"
                        description="Submitted vs pending vs late"
                        icon={Percent}
                        iconClassName="bg-[#3c8385]/10 text-[#3c8385]"
                    />

                    <DashboardStatCard
                        title="Needs Correction"
                        value="3"
                        description="Reports awaiting resubmission"
                        icon={AlertTriangle}
                        iconClassName="bg-red-50 text-red-600"
                    />

                    <DashboardStatCard
                        title="Open Blockers"
                        value="5"
                        description="Across the team"
                        icon={CircleAlert}
                        iconClassName="bg-orange-50 text-orange-600"
                    />
                </div>

                {/* Charts */}
                <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <TasksCompletedChart />
                    <ReportStatusChart />
                    <ProjectWorkloadChart />
                    <TaskTypeTimeChart />
                </div>

                {/* Recent Activity */}
                <div className="mt-6">
                    <RecentActivity />
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;