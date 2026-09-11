import TeamMembersTable from "../../components/TeamMembersTable";

const TeamMembersPage = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                <div className="mb-5">
                    <h1 className="text-lg font-semibold text-[#1b496d]">
                        Team Members
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View team members and their weekly report history.
                    </p>
                </div>

                <div className="rounded-xl border border-[#dcdddf] bg-white shadow-sm">
                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <h2 className="text-sm font-semibold text-gray-900">
                            Team Members
                        </h2>
                    </div>

                    <TeamMembersTable />
                </div>

            </div>
        </div>
    );
};

export default TeamMembersPage;