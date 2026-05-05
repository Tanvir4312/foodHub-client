import { providerStatsAction } from "@/action/provider.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingBag,
  CheckCircle2,
  UtensilsCrossed,
  ListOrdered,
  DollarSign,
} from "lucide-react";
import React from "react";

const ProviderStats = async () => {
  const res = await providerStatsAction();

  const stats = res?.data?.data;

  const {
    totalActiveOrder = 0,
    totalDeliveredOrder = 0,
    totalMeals = 0,
    totalOrders = 0,
    revenueData,
  } = stats || {};

  const totalRevenue = revenueData?._sum?.total_amount || 0;

  const statsConfig = [
    {
      title: "Total Revenue",
      value: `Tk ${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-5 w-5 text-emerald-600" />,
      description: "Total earnings from delivered orders",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Active Orders",
      value: totalActiveOrder,
      icon: <ShoppingBag className="h-5 w-5 text-blue-600" />,
      description: "Orders in preparation or out for delivery",
      bgColor: "bg-blue-50",
    },
    {
      title: "Delivered",
      value: totalDeliveredOrder,
      icon: <CheckCircle2 className="h-5 w-5 text-purple-600" />,
      description: "Orders successfully completed",
      bgColor: "bg-purple-50",
    },
    {
      title: "Menu Items",
      value: totalMeals,
      icon: <UtensilsCrossed className="h-5 w-5 text-orange-600" />,
      description: "Total dishes in your kitchen",
      bgColor: "bg-orange-50",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ListOrdered className="h-5 w-5 text-pink-600" />,
      description: "Total orders received till now",
      bgColor: "bg-pink-50",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Real-time statistics for your business.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsConfig.map((item, index) => (
          <Card
            key={index}
            className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900 dark:text-slate-100">
                {item.value}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProviderStats;
