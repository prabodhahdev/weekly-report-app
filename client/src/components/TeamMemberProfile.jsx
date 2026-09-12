import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye } from "lucide-react";

import PageLoader from "../components/ui/PageLoader.jsx";
import ReportsTable from "../components/reports/ReportsTable.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import apiFetch from "../api/apiFetch.js";

const PAGE_SIZE = 4;

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const TeamMemberProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberData();
  }, [id]);

  async function fetchMemberData() {
    try {
      setLoading(true);

      const usersResponse = await apiFetch("/api/auth/users");
      const usersData = await usersResponse.json();

      if (!usersResponse.ok) {
        throw new Error(usersData.message || "Failed to load team member");
      }

      const selectedMember = (usersData.users || []).find((user) => user._id === id);
      if (!selectedMember) {
        throw new Error("Team member not found");
      }
      setMember(selectedMember);

      const reportsResponse = await fetch(
        `http://localhost:8000/api/reports?member=${id}`,
        { credentials: "include" }
      );
      const reportsData = await reportsResponse.json();

      if (!reportsResponse.ok) {
        throw new Error(reportsData.message || "Failed to load reports");
      }
      setReports(reportsData.reports || []);
    } catch (error) {
      console.error("Fetch team member profile error:", error);
      toast.error(error.message || "Failed to load team member");
      navigate("/manager-team");
    } finally {
      setLoading(false);
    }
  }

  const totalReports = reports.length;
  const approved = reports.filter((r) => r.status === "approved").length;
  const needsCorrection = reports.filter((r) => r.status === "needs_correction").length;
  const submitted = reports.filter((r) => r.status === "submitted").length;
  const draft = reports.filter((r) => r.status === "draft").length;

  const stats = [
    { label: "Total Reports", value: totalReports },
    { label: "Approved", value: approved },
    { label: "Needs Correction", value: needsCorrection },
    { label: "Submitted", value: submitted },
    { label: "Draft", value: draft },
  ];

  const totalPages = Math.max(1, Math.ceil(reports.length / PAGE_SIZE));
  const pagedReports = useMemo(
    () => reports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [reports, page]
  );

  function getActions(report) {
    return [
      {
        label: "View report",
        icon: Eye,
        onClick: () => navigate(`/manager-report/${report._id}`),
      },
    ];
  }

  if (loading) return <PageLoader label="Loading team member..." />;

  if (!member) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-[#9ca3af]">Team member not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/manager-team")}
            className="mb-4 inline-flex bg-[#1b496dba] py-1 px-2 items-center gap-2 text-sm text-white rounded-full cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1b496d]/10 text-sm font-semibold text-[#1b496d]">
              {initials(member.name) || "-"}
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#1b3040]">{member.name}</h1>
              <div className="mt-0.5 flex items-center gap-2 text-sm text-[#6b7280]">
                <span>{member.email}</span>
                <span>•</span>
                <span className="capitalize">{member.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[#dcdddf] bg-white p-4 shadow-sm"
            >
              <p className="text-xs text-[#6b7280]">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-[#1b496d]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Report History */}
        <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#dcdddf] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#1b3040]">Report History</h2>
            <p className="mt-0.5 text-xs text-[#9ca3af]">
              View this team member's previous weekly reports.
            </p>
          </div>

          {reports.length > 0 ? (
            <>
              <ReportsTable reports={pagedReports} getActions={getActions} />
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                totalItems={reports.length}
                pageSize={PAGE_SIZE}
              />
            </>
          ) : (
            <div className="px-5 py-10 text-center text-sm text-[#9ca3af]">
              No reports found for this team member.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberProfile;