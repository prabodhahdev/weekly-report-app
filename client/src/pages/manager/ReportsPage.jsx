import { useNavigate } from "react-router-dom";
import { Eye, Check, MessageSquare } from "lucide-react";

import ReportsListPage from "../../components/reports/ReportsListPage.jsx";

const MOCK_TEAM_REPORTS = [
    {
        id: "1",
        memberName: "John Silva",
        weekStart: "2026-08-25",
        weekEnd: "2026-08-31",
        project: "Client A",
        status: "submitted",
        updatedAt: "2026-09-01",
    },
    {
        id: "2",
        memberName: "Sarah Perera",
        weekStart: "2026-09-01",
        weekEnd: "2026-09-07",
        project: "R&D",
        status: "needs_correction",
        updatedAt: "2026-09-08",
    },
    {
        id: "3",
        memberName: "Alex Fernando",
        weekStart: "2026-09-08",
        weekEnd: "2026-09-14",
        project: "Internal Tooling",
        status: "approved",
        updatedAt: "2026-09-09",
    },
];

export default function ReportsPage() {
    const navigate = useNavigate();

    function getActions(report) {
        const actions = [
            {
                label: "View",
                icon: Eye,
                onClick: () => navigate(`/manager-report/${report.id}`),
            },
        ];

        if (report.status === "submitted") {
            actions.push(
                {
                    label: "Approve",
                    icon: Check,
                    onClick: () => {
                        // TODO: approve report
                        console.log("Approve:", report.id);
                    },
                },
                {
                    label: "Request Changes",
                    icon: MessageSquare,
                    onClick: () => {
                        // TODO: open request changes modal
                        console.log("Request changes:", report.id);
                    },
                }
            );
        }

        return actions;
    }

    return (
        <ReportsListPage
            title="Team Reports"
            description="View and review weekly reports submitted by your team."
            reports={MOCK_TEAM_REPORTS}
            showMember={true}
            getActions={getActions}
            cardTitle="Team reports"
        />
    );
}