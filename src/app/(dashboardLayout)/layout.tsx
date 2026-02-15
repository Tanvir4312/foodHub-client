import { AppSidebar } from "@/components/layout/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
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
    const {data} = await services.getSessionService()
    const userRole = {
        role : data?.user?.role
    }
  
  return (
    <SidebarProvider>
      <AppSidebar user={userRole}/>
      <SidebarInset>
        {/* <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        
        
        </header> */}

        <div className="flex flex-1 flex-col gap-4 p-4">
          {userRole.role === Roles.admin && admin}
          {userRole.role === Roles.provider && provider}
          {userRole.role === Roles.customer && customer}
         
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
