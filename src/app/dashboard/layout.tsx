'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TimerProvider } from "@/contexts/TimerContext";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="lg:px-10 lg:py-4">
          <TimerProvider>
            {children}
          </TimerProvider>
        </div>
      </main>
    </SidebarProvider>
  );
}