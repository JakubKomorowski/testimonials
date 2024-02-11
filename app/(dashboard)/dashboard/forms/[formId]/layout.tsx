import ThemeChangeProvider from "@/app/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeChangeProvider>
      <div className="min-h-screen grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[49px,1fr,1fr,1fr]">
        <Toaster />
        <>{children}</>
      </div>
    </ThemeChangeProvider>
  );
}
