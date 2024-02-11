import ThemeButton from "@/app/components/ui/ThemeButton";
import ThemeChangeProvider from "@/app/components/providers/ThemeProvider";
import DashboardSidebar from "@/app/components/ui/nav/DashboardSidebar";
import DashboardTopbar from "@/app/components/ui/nav/DashboardTopbar";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeChangeProvider>
      <div className="min-h-screen grid grid-cols-[300px,1fr,1fr,1fr] grid-rows-[65px,1fr,1fr,1fr]">
        <Toaster />
        <DashboardSidebar />
        <DashboardTopbar />
        <div className="col-span-3 col-start-2 row-start-2">{children}</div>
      </div>
    </ThemeChangeProvider>
  );
}
