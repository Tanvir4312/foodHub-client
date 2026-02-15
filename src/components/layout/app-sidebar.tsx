import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import Link from "next/link";
import { Roles } from "@/constrants/roles";
import { RoutesType } from "@/types/routes.type";
import { adminRoute } from "@/routes/adminRoute";
import { providerRoute } from "@/routes/providerRoute";
import { customerRoute } from "@/routes/customerRoute";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: RoutesType = [];
  if (user.role === Roles.admin) {
    routes = adminRoute;
  } else if (user.role === Roles.provider) {
    routes = providerRoute;
  } else if (user.role === Roles.customer) {
    routes = customerRoute;
  } else {
    routes = [];
  }
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <Link key={item.title} href={item.url}>
            {item.title}
          </Link>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
