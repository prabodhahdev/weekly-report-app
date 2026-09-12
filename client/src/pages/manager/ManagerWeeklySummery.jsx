import { useEffect, useState } from "react";
import apiFetch from "../../api/apiFetch";
import WeeklySummaryFilters from "../../components/reports/week-summery/WeeklySummaryFilters";
import WeeklySummaryMemberCard from "../../components/reports/week-summery/WeeklySummeryMemberCard";

const ManagerWeeklySummery = () => {
    const [weekStart, setWeekStart] = useState("");
    const [section, setSection] = useState("blockers");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            if (!weekStart) return;

            try {
                setLoading(true);

                const response = await apiFetch(
                    `/api/reports?weekStart=${weekStart}`
                );

                const data = await response.json();

                if (!response.ok) {
                    console.error(data);
                    return;
                }

                setReports(data.reports || []);

            } catch (error) {
                console.error("Fetch weekly reports error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, [weekStart]);

    return (
        <div className="space-y-6 px-4 sm:px-8 py-6">

            {/* Header */}
            <div>
                <h1 className="text-lg font-semibold text-[#1b496d]">
                    Weekly Team Summary
                </h1>

                <p className="mt-1 text-sm text-[#6b7280]">
                    Compare your team's work across a selected week.
                </p>
            </div>

            {/* Filters */}
            <WeeklySummaryFilters
                weekStart={weekStart}
                setWeekStart={setWeekStart}
                section={section}
                setSection={setSection}
            />

            {/* Results */}
            {!weekStart ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">
                        Select a week to view the team summary.
                    </p>
                </div>
            ) : loading ? (
                <div className="py-10 text-center text-sm text-gray-500">
                    Loading team reports...
                </div>
            ) : reports.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">
                        No reports found for this week.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {reports.map((report) => (
                        <WeeklySummaryMemberCard
                            key={report._id}
                            member={report.member}
                            content={report.currentVersion?.[section]}
                            section={section}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default ManagerWeeklySummery;