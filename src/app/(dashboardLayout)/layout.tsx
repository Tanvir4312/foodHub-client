
import { AppSidebar } from "@/components/layout/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  //   SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constrants/roles";
import { services } from "@/services/user.services";
import { redirect } from "next/navigation";

export default async function Page({
  admin,
  customer,
  provider,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  customer: React.ReactNode;
  provider: React.ReactNode;
}) {
  const { data } = await services.getSessionService();
  const userRole = {
    role: data?.user?.role,
  };

  if (!data?.user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>
        <SidebarTrigger className="" />

        <div className="flex flex-1 flex-col gap-4 md:p-10">
          {userRole?.role === Roles.admin && admin}
          {userRole?.role === Roles.provider && provider}
          {userRole?.role === Roles.customer && customer}

          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
