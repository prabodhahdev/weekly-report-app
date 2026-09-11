import { useNavigate } from "react-router-dom";
import { Eye, ClipboardCheck } from "lucide-react";
import ReportsListPage from "../../components/reports/ReportsListPage.jsx";

// TODO: replace with GET /api/reports (manager sees the whole team)
const MOCK_TEAM_REPORTS = [
  { id: "1", memberName: "Nadeesha Perera", weekStart: "2026-09-08", weekEnd: "2026-09-14", project: "Client A", status: "submitted", updatedAt: "2026-09-09" },
  { id: "2", memberName: "Ruwan De Silva", weekStart: "2026-09-08", weekEnd: "2026-09-14", project: "Internal Tooling", status: "needs_correction", updatedAt: "2026-09-10" },
  { id: "3", memberName: "Ishara Kumari", weekStart: "2026-09-08", weekEnd: "2026-09-14", project: "R&D", status: "approved", updatedAt: "2026-09-11" },
  { id: "4", memberName: "Dilan Silva", weekStart: "2026-09-08", weekEnd: "2026-09-14", project: "Marketing", status: "draft", updatedAt: "2026-09-05" },
];

const MEMBERS = [...new Set(MOCK_TEAM_REPORTS.map((r) => r.memberName))];

export default function ManagerReportsPage() {
  const navigate = useNavigate();

  function getAction(report) {
    const reviewable = report.status === "submitted";
    return {
      label: reviewable ? "Review" : "View",
      icon: reviewable ? ClipboardCheck : Eye,
      onClick: () => navigate(`/manager-review/${report.id}`),
    };
  }

  return (
    <ReportsListPage
      title="Team Reports"
      description="All team members' weekly reports."
      reports={MOCK_TEAM_REPORTS}
      showMember
      members={MEMBERS}
      getAction={getAction}
    />
  );
}