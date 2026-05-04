import Footer from "@/components/layout/Footer";
import React from "react";

import NavbarWrapper from "@/components/layout/NavbarWrapper";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarWrapper />
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
