import Footer from "../components/ui/nav/Footer";
import Navbar from "../components/ui/nav/Navbar";

export default async function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary-foreground">
        <Navbar />
      </header>
      <main className="grow">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
