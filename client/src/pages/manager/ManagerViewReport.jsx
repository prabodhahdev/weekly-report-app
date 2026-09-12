import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ViewReport from "@/components/reports/view/ViewReport";
import VersionHistory from "@/components/reports/view/VersionHistory";
import ManagerReviewActions from "@/components/reports/review/ManagerReviewActions";
import apiFetch from "@/api/apiFetch";
import { ArrowLeft } from "lucide-react";

const ManagerViewReport = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [report, setReport] = useState(null);
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] =
        useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [id]);

    async function fetchReport() {
        try {
            setLoading(true);

            const response = await apiFetch(
                `/api/reports/${id}`,
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to load report"
                );
            }

            setReport(data.report);

            const apiVersions =
                data.versions || [];

            setVersions(apiVersions);

            if (apiVersions.length > 0) {
                setSelectedVersion(
                    apiVersions[0]
                );
            }

        } catch (error) {
            console.error(
                "Fetch manager report error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load report"
            );

            navigate("/manager-reports");

        } finally {
            setLoading(false);
        }
    }

    async function handleReview(data) {
        try {
            const response = await apiFetch(
                `/api/reports/${id}/review`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(data),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Failed to review report"
                );
            }

            toast.success(
                result.message ||
                "Report reviewed successfully"
            );

            // Reload report and versions
            await fetchReport();

        } catch (error) {
            console.error(
                "Review report error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to review report"
            );
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="text-sm text-gray-500">
                    Loading report...
                </div>
            </div>
        );
    }

    if (!report || !selectedVersion) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-gray-500">
                    No report data available.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <button
                type="button"
                onClick={() => navigate("/manager-reports")}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1b496dba] px-2 py-1 text-sm text-white cursor-pointer hover:bg-[#1b496d] transition"
            >
                <ArrowLeft size={16} />
                Back
            </button>
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">

                {/* Report */}
                <main className="min-w-0 flex-1">
                    {/* Report Content */}
                    <ViewReport
                        report={{
                            ...selectedVersion,
                            member: report.member,
                        }}
                    />

                    {/* Manager Review Actions */}
                    {selectedVersion.status ===
                        "submitted" && (
                            <ManagerReviewActions
                                onReview={
                                    handleReview
                                }
                            />
                        )}

                </main>

                {/* Version History */}
                <aside className="w-full lg:w-80 lg:shrink-0">
                    <VersionHistory
                        versions={versions}
                        selectedVersionId={
                            selectedVersion._id
                        }
                        onViewVersion={
                            setSelectedVersion
                        }
                    />
                </aside>

            </div>
        </div>
    );
};

export default ManagerViewReport;