import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search } from "lucide-react";
import { toast } from "react-toastify";

import PageLoader from "../components/ui/PageLoader.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import ReportActionsMenu from "../components/reports/ReportsActionsMenu.jsx";
import apiFetch from "../api/apiFetch.js";

const PAGE_SIZE = 6;

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const TeamMembersTable = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
        const response = await apiFetch("/api/auth/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load team members");
      }

      const users = data.users || [];
      const teamMembers = users.filter((user) => user.role === "member");
      setMembers(teamMembers);
    } catch (error) {
      console.error("Fetch team members error:", error);
      toast.error(error.message || "Failed to load team members");
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      `${member.name} ${member.email}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / PAGE_SIZE));
  const pagedMembers = filteredMembers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function getActions(member) {
    return [
      {
        label: "View Profile",
        icon: Eye,
        onClick: () => navigate(`/manager-team/${member._id}`),
      },
    ];
  }

  if (loading) return <PageLoader label="Loading team members..." />;

  return (
    <div>
      {/* Filter */}
      <div className="border-b border-[#dcdddf] p-5">
        <div className="relative max-w-sm">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name or email"
            className="w-full rounded-lg border border-[#d6d9e2] bg-white py-2.5 pl-9 pr-3 text-sm text-[#1b3040] outline-none transition focus:border-[#3d8086] focus:ring-2 focus:ring-[#3d8086]/15"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f2f2f2] text-left text-xs font-semibold text-[#1b496d] uppercase tracking-wide">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Reports</th>
              <th className="px-5 py-3 w-16 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pagedMembers.length > 0 ? (
              pagedMembers.map((member, i) => (
                <tr
                  key={member._id}
                  className={`border-t border-[#f2f2f2] hover:bg-[#f2f2f2]/50 transition-colors ${
                    i % 2 ? "bg-white" : "bg-[#f2f2f2]/20"
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1b496d]/10 text-[10px] font-semibold text-[#1b496d]">
                        {initials(member.name) || "-"}
                      </div>
                      <span className="font-medium text-[#6b7280]">
                        {member.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-[#6b7280]">{member.email}</td>

                  <td className="px-5 py-4 text-[#6b7280]">
                    {member.reportsCount || 0}
                  </td>

                  <td className="px-5 py-4">
                    <ReportActionsMenu actions={getActions(member)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-5 py-10 text-center text-sm text-[#9ca3af]">
                  No team members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={filteredMembers.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
};

export default TeamMembersTable;