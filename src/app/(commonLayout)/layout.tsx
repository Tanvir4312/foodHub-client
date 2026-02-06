import { Navbar } from "@/components/layout/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <Navbar/>
      </div>
      {children}
    </div>
  );
};

export default CommonLayout;
