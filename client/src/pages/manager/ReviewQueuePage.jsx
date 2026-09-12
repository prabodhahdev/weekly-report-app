import { Eye } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageLoader from "../../components/ui/PageLoader.jsx";
import ReportsTable from "../../components/reports/ReportsTable.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import apiFetch from "../../api/apiFetch.js";

const PAGE_SIZE = 10;

const ReviewQueuePage = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSubmittedReports();
  }, []);

  async function fetchSubmittedReports() {
    try {
      setLoading(true);
      const response = await apiFetch(
        "/api/reports?status=submitted"
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load submitted reports");
      }
      setReports(data.reports || []);
    } catch (error) {
      console.error("Fetch submitted reports error:", error);
      toast.error(error.message || "Failed to load submitted reports");
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(reports.length / PAGE_SIZE));
  const pagedReports = useMemo(
    () => reports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [reports, page]
  );

  function getActions(report) {
    return [
      {
        label: "Review",
        icon: Eye,
        onClick: () => navigate(`/manager-report/${report._id}`),
      },
    ];
  }

  if (loading) return <PageLoader label="Loading review queue..." />;

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-[#1b496d]">Review Queue</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            Review weekly reports submitted by team members.
          </p>
        </div>

        {/* Queue */}
        <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm overflow-hidden">
          {/* Section Header */}
          <div className="border-b border-[#dcdddf] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#1b3040]">Submitted Reports</h2>
            <p className="mt-0.5 text-xs text-[#9ca3af]">
              These reports are waiting for your review.
            </p>
          </div>

          {reports.length > 0 ? (
            <>
              <ReportsTable
                reports={pagedReports}
                showMember
                getActions={getActions}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={reports.length}
                pageSize={PAGE_SIZE}
              />
            </>
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-sm font-medium text-[#1b3040]">
                No reports waiting for review.
              </p>
              <p className="mt-1 text-xs text-[#9ca3af]">
                Submitted reports will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewQueuePage;