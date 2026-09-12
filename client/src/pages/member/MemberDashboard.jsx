import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FileText, Clock3, CheckCircle2, AlertTriangle } from "lucide-react";

import apiFetch from "../../api/apiFetch";
import { getCurrentWeek, formatDate } from "../../components/utils/date.js";

import PageLoader from "../../components/ui/PageLoader.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import CurrentWeekCard from "../../components/dashboard/CurrentWeekendCard.jsx";
import RecentReportsTable from "../../components/dashboard/RecentReportTable.jsx";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      setLoading(true);
      const response = await apiFetch("/api/reports/my-reports");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load reports");
      }
      setReports(data.reports || []);
    } catch (error) {
      console.error("Fetch member reports error:", error);
      toast.error(error.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  const totalReports = reports.length;
  const approvedReports = reports.filter((r) => r.status === "approved").length;
  const needsCorrectionReports = reports.filter((r) => r.status === "needs_correction").length;
  const pendingReports = reports.filter((r) => r.status === "draft").length;

  const { weekStart, weekEnd } = getCurrentWeek();

  const currentWeekReport = reports.find((report) => {
    if (!report.weekStart) return false;
    const reportWeekStart = new Date(report.weekStart);
    reportWeekStart.setHours(0, 0, 0, 0);
    return reportWeekStart.getTime() === weekStart.getTime();
  });

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.weekStart) - new Date(a.weekStart))
    .slice(0, 5);

  const STAT_CARDS = [
  { key: "total", label: "Total Reports", value: totalReports, subLabel: "Your weekly reports", icon: FileText, variant: "teal" },
  { key: "pending", label: "Pending", value: pendingReports, subLabel: "Awaiting submission", icon: Clock3, variant: "navy" },
  { key: "approved", label: "Approved", value: approvedReports, subLabel: "Reports approved", icon: CheckCircle2, variant: "mint" },
  { key: "needs_correction", label: "Needs Correction", value: needsCorrectionReports, subLabel: "Requires your action", icon: AlertTriangle, variant: "navyDeep" },
];

if (loading) return <PageLoader label="Loading dashboard..." />;

return (
  <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
      <div className="mb-6">
        <h1 className="text-xl lg:text-3xl font-bold text-[#518a88]">Welcome Back!</h1>
        <p className="mt-1 text-sm text-[#6b7280]">View your weekly reports and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.key} {...card} />
        ))}
      </div>

      <CurrentWeekCard
        weekStart={weekStart}
        weekEnd={weekEnd}
        report={currentWeekReport}
        formatDate={formatDate}
        onCreateReport={() => navigate("/member-report")}
      />

      <RecentReportsTable reports={recentReports} formatDate={formatDate} />
    </div>
  </div>
);
};

export default MemberDashboard;