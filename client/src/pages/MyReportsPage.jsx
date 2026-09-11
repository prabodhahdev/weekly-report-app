import { useNavigate } from "react-router-dom";
import { Eye, Pencil } from "lucide-react";
import ReportsListPage from "../components/reports/ReportsListPage.jsx";

// TODO: replace with GET /api/reports?mine=true
const MOCK_MY_REPORTS = [
  { id: "1", weekStart: "2026-08-25", weekEnd: "2026-08-31", project: "Client A", status: "approved", updatedAt: "2026-09-01" },
  { id: "2", weekStart: "2026-09-01", weekEnd: "2026-09-07", project: "R&D", status: "needs_correction", updatedAt: "2026-09-08" },
  { id: "3", weekStart: "2026-09-08", weekEnd: "2026-09-14", project: "Internal Tooling", status: "submitted", updatedAt: "2026-09-09" },
  { id: "4", weekStart: "2026-09-15", weekEnd: "2026-09-21", project: "Client A", status: "draft", updatedAt: "2026-09-11" },
];

const EDITABLE_STATUSES = ["draft", "needs_correction"];

export default function MyReportsPage() {
  const navigate = useNavigate();

  function getAction(report) {
    const editable = EDITABLE_STATUSES.includes(report.status);
    return {
      label: editable ? "Edit" : "View",
      icon: editable ? Pencil : Eye,
      onClick: () => navigate(`/member-report/${report.id}`),
    };
  }

  return (
    <ReportsListPage
      title="My Reports"
      description="Your weekly report history and current statuses."
      reports={MOCK_MY_REPORTS}
      getAction={getAction}
      onNewReport={() => navigate("/member-report")}
    />
  );
}