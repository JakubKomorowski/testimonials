import ThemeButton from "@/app/components/ui/ThemeButton";
import ThemeChangeProvider from "@/app/components/providers/ThemeProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeChangeProvider>
      <>
        <ThemeButton />
        {children}
      </>
    </ThemeChangeProvider>
  );
}
