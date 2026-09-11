import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Unable to load profile.
                </p>
            </div>
        );
    }

    const initials = user.name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-[#1b496d]">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View your account information and role.
                    </p>
                </div>

                {/* Profile Banner */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1b496d] to-[#3c8385] p-6 shadow-sm">

                    <div
                        className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10"
                        aria-hidden="true"
                    />

                    <div
                        className="absolute -bottom-16 right-28 h-32 w-32 rounded-full bg-[#caf29a]/20"
                        aria-hidden="true"
                    />

                    <div className="relative flex items-center gap-5">

                        {/* Avatar */}
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#caf29a] text-xl font-semibold text-[#1b496d]">
                            {initials || "U"}
                        </div>

                        <div className="min-w-0">

                            <h2 className="text-lg font-semibold text-white">
                                {user.name}
                            </h2>

                            <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
                                <Mail size={15} />
                                {user.email}
                            </p>

                            <span className="mt-3 inline-flex rounded-full bg-[#caf29a] px-3 py-1 text-xs font-medium capitalize text-[#1b496d]">
                                {user.role}
                            </span>

                        </div>

                    </div>
                </div>

                {/* Account Information */}
                <div className="mt-5 rounded-xl border border-[#dcdddf] bg-white shadow-sm">

                    <div className="border-b border-[#dcdddf] px-5 py-4">
                        <div className="flex items-center gap-2">

                            <UserRound
                                size={18}
                                className="text-[#3c8385]"
                            />

                            <h2 className="text-sm font-semibold text-gray-900">
                                Account Information
                            </h2>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2">

                        {/* Full Name */}
                        <div className="border-b border-[#dcdddf] px-5 py-4 sm:border-r">
                            <p className="text-xs font-medium text-gray-500">
                                Full Name
                            </p>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {user.name}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="border-b border-[#dcdddf] px-5 py-4">
                            <p className="text-xs font-medium text-gray-500">
                                Email Address
                            </p>

                            <p className="mt-1 break-all text-sm font-medium text-gray-900">
                                {user.email}
                            </p>
                        </div>

                        {/* Role */}
                        <div className="px-5 py-4 sm:border-r">
                            <p className="text-xs font-medium text-gray-500">
                                Role
                            </p>

                            <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                                {user.role}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="px-5 py-4">
                            <p className="text-xs font-medium text-gray-500">
                                Account Status
                            </p>

                            <div className="mt-1 flex items-center gap-2">

                                <ShieldCheck
                                    size={16}
                                    className="text-[#3c8385]"
                                />

                                <span className="text-sm font-medium text-gray-900">
                                    Active
                                </span>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;