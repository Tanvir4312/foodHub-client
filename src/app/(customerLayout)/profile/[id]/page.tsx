import { getCustomerProfileAction } from "@/action/customer.action";
import { Calendar, Camera, Edit, Mail, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";

// type UserProfileType = {
//   id: string;
//   name: string;
//   email: string;
//   phone_number: string;
//   image: string;
//   role: string;
//   status: string;
//   createdAt: string;
// };

const Profile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const res = await getCustomerProfileAction(id);
  const customer_profile = await res?.data;
  console.log(customer_profile);
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
                <Image
                  src={customer_profile?.image}
                  height={200}
                  width={200}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 p-1.5 bg-[#E21B70] text-white rounded-lg border-2 border-white shadow-sm">
                <Camera size={16} />
              </div>
            </div>

            {/* Edit Button */}
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
          </div>

          {/* User Basic Info */}
          <div className="space-y-1 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {customer_profile?.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <ShieldCheck size={18} className="text-green-500" />
              <span className="text-sm uppercase tracking-wider">
                {customer_profile?.role}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                {customer_profile?.status}
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
                <p className="text-gray-800 font-medium">
                  {customer_profile?.email}
                </p>
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
                  {customer_profile?.phone_number}
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
                  {new Date(customer_profile?.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal / Form Overlay */}
      {/* {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Update Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E21B70] focus:border-transparent outline-none"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#E21B70] focus:border-transparent outline-none"
                  placeholder="Paste image URL here"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-[#E21B70] hover:bg-[#c41761] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Profile;
