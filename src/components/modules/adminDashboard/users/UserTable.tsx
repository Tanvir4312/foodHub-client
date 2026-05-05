import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from "@/types/user.type";
import Link from "next/link";
import { Calendar, Mail, User, Shield, Activity, Settings2 } from "lucide-react";

interface UserTableProps {
  users: UserType[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 dark:bg-slate-800/50 border-none hover:bg-slate-50 dark:hover:bg-slate-800/50">
            <TableHead className="py-6 pl-8 text-slate-500 font-bold uppercase tracking-wider text-xs">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-orange-500" /> Date Joined
              </div>
            </TableHead>
            <TableHead className="py-6 text-slate-500 font-bold uppercase tracking-wider text-xs">
              <div className="flex items-center gap-2">
                <User size={14} className="text-orange-500" /> User Info
              </div>
            </TableHead>
            <TableHead className="py-6 text-slate-500 font-bold uppercase tracking-wider text-xs">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-orange-500" /> Role
              </div>
            </TableHead>
            <TableHead className="py-6 text-slate-500 font-bold uppercase tracking-wider text-xs text-center">
              <div className="flex items-center gap-2 justify-center">
                <Activity size={14} className="text-orange-500" /> Status
              </div>
            </TableHead>
            <TableHead className="py-6 pr-8 text-slate-500 font-bold uppercase tracking-wider text-xs text-right">
              <div className="flex items-center gap-2 justify-end">
                <Settings2 size={14} className="text-orange-500" /> Actions
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user: UserType) => (
            <TableRow key={user.id} className="border-slate-50 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              <TableCell className="pl-8">
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {new Date(user.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{user.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Mail size={12} className="text-orange-500/60" /> {user.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                  ${user.role === "ADMIN" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" :
                    user.role === "PROVIDER" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" :
                      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"}`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
                  ${user.status === "ACTIVE" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
                    user.status === "SUSPENDED" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" :
                      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"}`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell className="pr-8 text-right">
                <Link
                  href={`/admin-dashboard/status/${user.id}`}
                  className="inline-flex items-center h-9 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-orange-500/10 active:scale-95"
                >
                  Manage Status
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
