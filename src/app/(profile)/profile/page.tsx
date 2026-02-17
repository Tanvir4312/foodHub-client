import { Roles } from "@/constrants/roles";
import { services } from "@/services/user.services";

import {
  Calendar,
  Camera,
  Edit,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

const Profile = async () => {
  const session = await services.getSessionService();
  const userData = session?.data?.user;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Profile Header / Banner */}
        <div className="h-32 bg-linear-to-r from-[#E21B70] to-pink-400"></div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="h-32 w-32 rounded-2xl border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                {userData?.image && userData.image.trim() !== "" ? (
                  <Image
                    src={userData.image}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-400">
                    <User size={48} />
                  </div>
                )}
              </div>
              <div className="absolute bottom-2 right-2 p-1.5 bg-[#E21B70] text-white rounded-lg border-2 border-white shadow-sm">
                <Camera size={16} />
              </div>
            </div>

            {/* Edit Button */}
            {userData?.role === Roles.customer && (
              <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md">
                <Link
                  href={`/profile-update`}
                  className="flex items-center gap-2"
                >
                  {" "}
                  <Edit size={18} />
                  Edit Profile
                </Link>
              </button>
            )}
          </div>

          {/* User Basic Info */}
          <div className="space-y-1 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {userData?.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <ShieldCheck size={18} className="text-green-500" />
              <span className="text-sm uppercase tracking-wider">
                {userData?.role}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                {userData?.status}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#E21B70] shadow-sm">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Email Address
                </p>
                <p className="text-gray-800 font-medium">{userData?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#E21B70] shadow-sm">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Phone Number
                </p>
                <p className="text-gray-800 font-medium">
                  {userData?.phone_number}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#E21B70] shadow-sm">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Member Since
                </p>
                <p className="text-gray-800 font-medium">
                  {new Date(userData?.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
