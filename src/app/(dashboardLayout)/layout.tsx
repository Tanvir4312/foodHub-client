import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";


import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  //   SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constrants/roles";
import { services } from "@/services/user.services";

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

  return (
    <SidebarProvider>
      <AppSidebar user={userRole} />
      <SidebarInset>

        <SidebarTrigger className="" />
          
       
          <div className="flex flex-1 flex-col gap-4 p-10">
           
              {userRole.role === Roles.admin && admin}
              {userRole.role === Roles.provider && provider}
              {userRole.role === Roles.customer && customer}
         
            <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
          </div>
     
      </SidebarInset>
    </SidebarProvider>
  );
}
