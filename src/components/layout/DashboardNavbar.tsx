"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Sun, Moon, Home, User, LogOut, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

interface DashboardNavbarProps {
    userName?: string;
    userRole?: string;
    userImage?: string;
}

export function DashboardNavbar({ userName, userRole, userImage }: DashboardNavbarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
        router.refresh();
    };

    // Build breadcrumb from pathname
    const segments = pathname?.split("/").filter(Boolean) || [];
    const breadcrumb = segments.map((seg, i) => ({
        label: seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        href: "/" + segments.slice(0, i + 1).join("/"),
    }));

    const roleColor: Record<string, string> = {
        ADMIN: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
        PROVIDER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        CUSTOMER: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
            <div className="flex h-16 items-center gap-4 px-4 md:px-6">
                {/* Sidebar Trigger */}
                <SidebarTrigger className="text-slate-500 hover:text-orange-500 transition-colors" />

                {/* Divider */}
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />

                {/* Breadcrumb */}
                <nav className="hidden lg:flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <Link
                        href="/"
                        className="hover:text-orange-500 transition-colors flex items-center gap-1"
                    >
                        <Home size={14} />
                    </Link>
                    {breadcrumb.map((crumb, i) => (
                        <span key={crumb.href} className="flex items-center gap-1.5">
                            <span className="text-slate-300 dark:text-slate-600">/</span>
                            {i === breadcrumb.length - 1 ? (
                                <span className="text-slate-900 dark:text-white font-medium">
                                    {crumb.label}
                                </span>
                            ) : (
                                <Link
                                    href={crumb.href}
                                    className="hover:text-orange-500 transition-colors"
                                >
                                    {crumb.label}
                                </Link>
                            )}
                        </span>
                    ))}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Notifications */}
                    <button className="relative p-2 rounded-xl text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
                    </button>

                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 rounded-xl text-slate-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all"
                        >
                            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}

                    {/* Divider */}
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block" />

                    {/* User Dropdown */}
                    {mounted ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all outline-none">
                                    {/* Avatar */}
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-orange-500/10 overflow-hidden shadow-sm">
                                        {userImage ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{userName?.charAt(0)?.toUpperCase() || "U"}</span>
                                        )}
                                    </div>

                                    {/* Name & Role */}
                                    <div className="hidden lg:flex flex-col text-left">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                            {userName || "User"}
                                        </span>
                                        {userRole && (
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md w-fit mt-0.5 ${roleColor[userRole] || "bg-slate-100 text-slate-600"}`}>
                                                {userRole}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 shadow-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                                <DropdownMenuLabel className="px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-400">
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                                <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 gap-3 cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 transition-colors">
                                    <Link href="/profile" className="flex items-center gap-3 w-full">
                                        <User size={18} className="text-slate-400 group-focus:text-orange-500" />
                                        <span className="font-semibold text-sm">My Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                                <DropdownMenuItem 
                                    onClick={handleLogout}
                                    className="rounded-xl px-3 py-2.5 gap-3 cursor-pointer focus:bg-rose-50 dark:focus:bg-rose-500/10 focus:text-rose-600 transition-colors"
                                >
                                    <LogOut size={18} className="text-slate-400" />
                                    <span className="font-semibold text-sm">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-3 p-1">
                            <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                            <div className="hidden lg:flex flex-col gap-1">
                                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                                <div className="h-2 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
