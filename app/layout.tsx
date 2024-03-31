import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/providers/SessionProvider";
import FirebaseAuthProvider from "./components/providers/FirebaseAuthProvider";
import SubscriptionProvider from "./components/providers/SubscriptionProvider";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import FormProvider from "./components/providers/FormProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trust Catcher",
  description: "Collect, customize and publish testimonials",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SessionProvider session={session}>
          <FirebaseAuthProvider>
            <FormProvider>
              <SubscriptionProvider>{children}</SubscriptionProvider>
            </FormProvider>
          </FirebaseAuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
