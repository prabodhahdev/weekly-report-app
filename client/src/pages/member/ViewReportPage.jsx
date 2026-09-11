import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ViewReport from "../../components/reports/view-report/ViewReport";
import VersionHistory from "../../components/reports/view-report/VersionHistory";

const ViewReportPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [id]);

    async function fetchReport() {
        try {
            const response = await fetch(
                `http://localhost:8000/api/reports/my-reports/${id}`,
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load report"
                );
            }

            const apiVersions = data.versions || [];

            setReport(data.report);
            setVersions(apiVersions);

            if (apiVersions.length > 0) {
                setSelectedVersion(apiVersions[0]);
            }

        } catch (error) {
            console.error(
                "Fetch report error:",
                error
            );

            toast.error(
                error.message ||
                "Failed to load report"
            );

            navigate("/member-reports");

        } finally {
            setLoading(false);
        }
    }

    function handleViewVersion(version) {
        setSelectedVersion(version);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="text-sm text-slate-500">
                    Loading report...
                </div>
            </div>
        );
    }

    if (!report || !selectedVersion) {
        return (
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                    No report data available.
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">

                {/* Report */}
                <main className="min-w-0 flex-1">

                    <ViewReport
                        report={selectedVersion}
                    />

                </main>

                {/* Versions */}
                <aside className="w-full lg:w-80 lg:shrink-0">

                    <VersionHistory
                        versions={versions}
                        selectedVersionId={
                            selectedVersion._id
                        }
                        onViewVersion={
                            handleViewVersion
                        }
                    />

                </aside>

            </div>

        </div>
    );
};

export default ViewReportPage;