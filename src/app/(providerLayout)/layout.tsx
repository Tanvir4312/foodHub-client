import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React from "react";

const ProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ProviderLayout;
