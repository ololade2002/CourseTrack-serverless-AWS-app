import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 min-w-0 w-full bg-[#f7f7f7]">
          <header className="px-2 pt-2 pb-1">
            <SidebarTrigger />
          </header>

          <div className=" pb-4">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}