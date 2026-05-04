"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Roles } from "@/constrants/roles";
import { RoutesType } from "@/types/routes.type";
import { adminRoute } from "@/routes/adminRoute";
import { providerRoute } from "@/routes/providerRoute";
import { customerRoute } from "@/routes/customerRoute";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Tag,
  Home,
  ChefHat,
  Package,
  PlusCircle,
  BarChart3,
  UtensilsCrossed,
  LogOut,
  Settings,
  X,
  UserCircle,
  Heart,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  "Stats": <BarChart3 className="size-4" />,
  "All User": <Users className="size-4" />,
  "All Order": <ShoppingBag className="size-4" />,
  "Add Category": <PlusCircle className="size-4" />,
  "All Categoy": <Tag className="size-4" />,
  "Create Profile": <Settings className="size-4" />,
  "Incomin Order": <Package className="size-4" />,
  "Add Meal": <PlusCircle className="size-4" />,
  "My Meals": <UtensilsCrossed className="size-4" />,
  "My Orders": <ShoppingBag className="size-4" />,
  "My Reviews": <Heart className="size-4" />,
  "Offers": <UtensilsCrossed className="size-4" />,
  "Home": <Home className="size-4" />,
};

const roleConfig: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  ADMIN: {
    label: "Admin",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    icon: <Settings className="size-3" />
  },
  PROVIDER: {
    label: "Provider",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    icon: <ChefHat className="size-3" />
  },
  CUSTOMER: {
    label: "Customer",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: <UserCircle className="size-3" />
  },
};

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile, isMobile, state } = useSidebar();

  let routes: RoutesType = [];
  if (user.role === Roles.admin) routes = adminRoute;
  else if (user.role === Roles.provider) routes = providerRoute;
  else if (user.role === Roles.customer) routes = customerRoute;

  const role = roleConfig[user.role] || {
    label: user.role,
    color: "text-slate-600",
    bg: "bg-slate-50",
    icon: <LayoutDashboard className="size-3" />
  };

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const handleSignOut = async () => {
    if (isMobile) setOpenMobile(false);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-4.5 border-b border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center justify-between px-1">
          <Link href="/" onClick={handleNavClick} className="flex items-center gap-2 group">
            <div className="size-7 rounded-lg bg-gradient-to-tr from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <ChefHat className="size-4 text-white" />
            </div>
            <div className={cn("flex flex-col", state === "collapsed" && "md:hidden")}>
              <p className="text-xs font-black leading-none tracking-tight">
                <span className="text-slate-900 dark:text-slate-50">Food</span>
                <span className="text-orange-500">Hub</span>
              </p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control</p>
            </div>
          </Link>

          {isMobile && (
            <button
              onClick={() => setOpenMobile(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <div className={cn("px-1 mb-4", state === "collapsed" && "md:hidden")}>
            <div className={cn("flex items-center gap-2 px-2.5 py-2 rounded-lg border border-transparent transition-all", role.bg)}>
              <div className={cn("p-1 rounded-md bg-white dark:bg-slate-900 shadow-sm", role.color)}>
                {role.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={cn("text-[8px] font-black uppercase tracking-widest opacity-50 leading-none mb-0.5", role.color)}>
                  Session
                </span>
                <span className={cn("text-[11px] font-bold truncate leading-none", role.color)}>
                  {role.label} Panel
                </span>
              </div>
            </div>
          </div>

          <SidebarGroupLabel className="px-2 text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {routes.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "h-9 px-2 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/10 hover:bg-orange-600"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-orange-500"
                      )}
                    >
                      <Link href={item.url} onClick={handleNavClick} className="flex items-center gap-2.5 font-semibold">
                        <div className={cn(
                          "flex items-center justify-center size-5 transition-colors",
                          isActive ? "text-white" : "text-slate-400 group-hover:text-orange-500"
                        )}>
                          {iconMap[item.title] || <LayoutDashboard className="size-4" />}
                        </div>
                        <span className="text-[12px] truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 mt-auto border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[12px] font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 transition-all border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm group"
        >
          <div className="flex items-center justify-center size-5 text-rose-500 group-hover:translate-x-0.5 transition-transform">
            <LogOut className="size-4" />
          </div>
          <span>Sign Out</span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}