import ThemeChangeProvider from "@/app/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeChangeProvider>
      <div className="">
        <Toaster />
        <>{children}</>
      </div>
    </ThemeChangeProvider>
  );
}
