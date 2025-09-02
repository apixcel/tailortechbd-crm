"use client";

import { Header, SideBar } from "@/components";
import ProtectedRoute from "@/provider/ProtectedRoute";
import { useState } from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <ProtectedRoute>
      <div className="w-ful flex h-[100dvh] flex-col items-start justify-start gap-0">
        <Header />
        <div className="flex h-[calc(100%-60px)] w-full gap-[0px]">
          <SideBar />
          <main className="h-full w-full overflow-auto p-[20px] md:p-[30px]">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PageLayout;
