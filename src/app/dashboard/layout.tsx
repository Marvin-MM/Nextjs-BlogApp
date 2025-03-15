import Sidebar from "@/components/dashboard/sidebar";
import React, { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { Navbar } from "@/components/home/header/navbar";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Navbar isLoggedIn={!!user} />
      <div className="flex py-16">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
