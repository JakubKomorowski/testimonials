import ProgressBarProvider from "../components/providers/ProgressBarProvider";
import Footer from "../components/ui/nav/Footer";
import Navbar from "../components/ui/nav/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default async function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <header className="bg-bg">
        <Navbar />
      </header>
      <ProgressBarProvider>
        <main className="grow">{children}</main>
      </ProgressBarProvider>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
