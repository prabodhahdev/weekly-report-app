
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search } from "lucide-react";

const DUMMY_MEMBERS = [
    {
        id: "1",
        name: "John Silva",
        email: "john.silva@gmail.com",
        reports: 12,
    },
    {
        id: "2",
        name: "Sarah Perera",
        email: "sarah.perera@gmail.com",
        reports: 9,
    },
    {
        id: "3",
        name: "Alex Fernando",
        email: "alex.fernando@gmail.com",
        reports: 15,
    },
    {
        id: "4",
        name: "Nimal Perera",
        email: "nimal.perera@gmail.com",
        reports: 7,
    },
];

const TeamMembersTable = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const filteredMembers = DUMMY_MEMBERS.filter((member) =>
        `${member.name} ${member.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Filter */}
            <div className="border-b border-[#dcdddf] p-5">
                <div className="relative max-w-sm">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#3c8385] focus:ring-2 focus:ring-[#3c8385]/10"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#dcdddf] text-left">
                            <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                Name
                            </th>

                            <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                Email
                            </th>

                            <th className="px-5 py-3 text-xs font-medium text-gray-500">
                                Reports
                            </th>

                            <th className="px-5 py-3 text-right text-xs font-medium text-gray-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((member) => (
                                <tr
                                    key={member.id}
                                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-gray-900">
                                            {member.name}
                                        </p>
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {member.email}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {member.reports}
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/manager-team/${member.id}`
                                                )
                                            }
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#dcdddf] px-3 py-2 text-xs font-medium text-[#1b496d] hover:bg-[#1b496d]/5"
                                        >
                                            <Eye size={15} />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-5 py-10 text-center text-sm text-gray-500"
                                >
                                    No team members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamMembersTable;
