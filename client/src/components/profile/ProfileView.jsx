import { Mail, ShieldCheck, UserRound, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/components/ui/PageLoader.jsx";
import ProfileBanner from "@/components/profile/ProfileBanner.jsx";
import InfoRow from "@/components/profile/InfoRow.jsx";

const ProfileView = () => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader label="Loading profile..." />;

  if (!user) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-[#9ca3af]">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f2f2]">
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-[#1b496d]">My Profile</h1>
          <p className="mt-1 text-sm text-[#6b7280]">
            View your account information and role.
          </p>
        </div>

        <ProfileBanner name={user.name} email={user.email} role={user.role} />

        <div className="mt-5 rounded-xl border border-[#dcdddf] bg-white shadow-sm overflow-hidden">
          <div className="border-b border-[#dcdddf] px-5 py-4 flex items-center gap-2">
            <UserRound size={17} className="text-[#3d8086]" />
            <h2 className="text-sm font-semibold text-[#1b3040]">Account Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-[#f2f2f2]">
            <div className="divide-y divide-[#f2f2f2] sm:border-r sm:border-[#f2f2f2]">
              <InfoRow icon={UserRound} label="Full Name" value={user.name} />
              <InfoRow icon={Briefcase} label="Role" value={user.role} valueClassName="capitalize" />
            </div>
            <div className="divide-y divide-[#f2f2f2]">
              <InfoRow icon={Mail} label="Email Address" value={user.email} />
              <InfoRow
                icon={ShieldCheck}
                label="Account Status"
                value="Active"
                valueClassName="text-[#3d8086]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
