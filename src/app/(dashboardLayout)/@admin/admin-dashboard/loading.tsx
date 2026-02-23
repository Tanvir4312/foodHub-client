import { Loader2 } from "lucide-react";
import React from "react";

const AdminDashboardLoading = () => {
  return (
    <div className="flex justify-center my-20">
      <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
    </div>
  );
};

export default AdminDashboardLoading;
