import { adminStatsAction } from "@/action/admin.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  ShoppingBag,
  Clock,
  XCircle,
  TrendingUp,
  DollarSign,
  UserPlus,
  ArrowUpRight,
  Activity,
  UserCheck,
  UserMinus,
} from "lucide-react";

export default async function PremiumAdminStats() {

  const res = await adminStatsAction();

  const stats = res?.data;



  if (!stats) {
    return;
  }

  const activeUsers = stats?.active_user;
  const suspendedUsers = stats?.supended_user;
  const totalRevenue = stats?.total_revenue?._sum?.total_amount || 0;
  const globalAOV = stats?.average_order_value?._avg?.total_amount || 0;
  const monthlyAOV = stats?.monthly_AOV?._avg?.total_amount || 0;
  const totalUsers = stats?.total_user || 0;
  const activeProviders = stats?.active_providers || 0;
  const pendingOrders = stats?.pending_orders || 0;
  const deliveredOrders = stats?.total_delivered || 0;
  const cancelledOrders = stats?.cancleed_orders || 0;
  const signup24h = stats?.last_24H_singups || 0;
  const signup7d = stats?.last_7D_singups || 0;

  return (
    <div className="space-y-8 p-2">
      <div className="md:flex gap-3 space-y-4 md:space-y-0">
        {/* Active Users - Emerald Theme */}
        <Card className="border-none shadow-xl bg-white group hover:-translate-y-1 transition-all duration-300 flex-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                <UserCheck size={24} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                ACTIVE
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Users</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {activeUsers}
            </h3>
            <p className="text-xs text-emerald-500 font-bold mt-2">
              Verified Accounts
            </p>
          </CardContent>
        </Card>

        {/* Suspended Users - Rose/Red Theme */}
        <Card className="border-none shadow-xl bg-white group hover:-translate-y-1 transition-all duration-300 flex-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                <UserMinus size={24} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 bg-rose-100 text-rose-700 rounded-full">
                SUSPENDED
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Suspended Users
            </p>
            <h3 className="text-2xl font-extrabold text-rose-600">
              {suspendedUsers}
            </h3>
            <p className="text-xs text-rose-400 font-medium mt-2">
              Restricted Access
            </p>
          </CardContent>
        </Card>
      </div>
      {/* --- Section 1: Top Hero Stats --- */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Revenue Card - Gradient Background */}
        <Card className="border-none bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-2xl overflow-hidden relative group">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform">
            <DollarSign size={120} />
          </div>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 dark:text-slate-300 text-xs font-bold uppercase tracking-widest">
                  Total Revenue
                </p>
                <h2 className="text-3xl font-black mt-2 tracking-tighter text-white dark:text-slate-100">
                  ৳{totalRevenue.toLocaleString()}
                </h2>
              </div>
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                <Activity className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-bold">
              <ArrowUpRight size={16} />
              <span>Lifetime Growth</span>
            </div>
          </CardContent>
        </Card>

        {/* Average Order Value - Clean Glass Look */}
        <Card className="border-none shadow-xl bg-white group hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <TrendingUp size={24} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                GLOBAL AVG
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Avg. Order Value
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              ৳{globalAOV.toFixed(0)}
            </h3>
            <p className="text-xs text-blue-500 font-bold mt-2">
              Monthly: ৳{monthlyAOV.toFixed(0)}
            </p>
          </CardContent>
        </Card>

        {/* Total Community */}
        <Card className="border-none shadow-xl bg-white group hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                <Users size={24} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                TOTAL
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Community Size</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {totalUsers}
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Verified registrations
            </p>
          </CardContent>
        </Card>

        {/* Active Providers */}
        <Card className="border-none shadow-xl bg-white group hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <ShoppingBag size={24} />
              </div>
              <span className="text-[10px] font-black px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                SELLERS
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Active Providers
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              {activeProviders}
            </h3>
            <p className="text-xs text-orange-500 font-bold mt-2">
              Live Storefronts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- Section 2: Split View --- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Performance Tracker */}
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-slate-50/30">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-500" />
              Order Performance Tracker
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Delivery Progress */}
              <div>
                <div className="flex justify-between text-sm mb-3">

                  <span className="font-black text-emerald-600">
                    Delivered: {deliveredOrders}
                  </span>
                </div>
                <div className="h-4 w-full bg-slate-100 rounded-full p-1">
                  <div
                    className="h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg shadow-emerald-200"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              {/* Status Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-amber-700 uppercase">
                      Pending
                    </p>
                    <p className="text-xl font-black text-slate-800 dark:text-slate-100">
                      {pendingOrders}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-50/50 border border-red-100">
                  <div className="p-2 bg-red-100 rounded-xl text-red-600">
                    <XCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-red-700 uppercase">
                      Cancelled
                    </p>
                    <p className="text-xl font-black text-slate-800 dark:text-slate-100">
                      {cancelledOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Acquisition Analytics */}
        <Card className="border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-indigo-500" />
              Acquisition Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="relative flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100 group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-[8px] font-black rounded-full">
                  TODAY
                </div>
                <p className="text-4xl font-black text-slate-800 dark:text-slate-100">
                  {signup24h}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  New Signups
                </p>
              </div>
              <div className="relative flex flex-col items-center p-6 rounded-3xl bg-indigo-50 border border-indigo-100 group">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-[8px] font-black rounded-full">
                  THIS WEEK
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-slate-900">
                {signup7d}
              </div>
                <p className="text-xs text-indigo-500 font-medium mt-1">
                  New Signups
                </p>
              </div>
            </div>


          </CardContent>
        </Card>
      </div>
    </div>
  );
}
