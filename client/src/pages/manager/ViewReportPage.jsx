import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ViewReport from "../../components/reports/view-report/ViewReport";
import VersionHistory from "../../components/reports/view-report/VersionHistory";
import apiFetch from "../../api/apiFetch";

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
            const response = await apiFetch(
                `/api/reports/my-reports/${id}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to load report");
            }

            setReport(data.report);
            setVersions(data.versions || []);

            if (data.versions?.length > 0) {
                setSelectedVersion(data.versions[0]);
            }
        } catch (error) {
            console.error("Fetch report error:", error);

            toast.error(error.message || "Failed to load report");

            navigate("/member-reports");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="p-6 text-sm text-slate-500">Loading report...</div>;
    }

    if (!report || !selectedVersion) {
        return (
            <div className="p-6 text-sm text-slate-500">
                No report data available.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
                <main className="min-w-0 flex-1">
                    <ViewReport report={selectedVersion} />
                </main>

                <aside className="w-full lg:w-80 lg:shrink-0">
                    <VersionHistory
                        versions={versions}
                        selectedVersionId={selectedVersion._id}
                        onViewVersion={setSelectedVersion}
                    />
                </aside>
            </div>
        </div>
    );
};

export default ViewReportPage;
