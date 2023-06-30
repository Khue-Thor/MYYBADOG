import "@/styles/globals.css";
import { Inter } from "next/font/google";

import { ServerThemeProvider } from "next-themes";
import { Providers } from "../components/providers";
import Header01 from "@/components/ui/header/header01";
import Footer from "../components/ui/footer";
import "@/styles/custom.css";
import BidsModal from "@/components/modal/BidsModal";
import { Session } from "next-auth";
import { Toaster } from "@/components/shadcn/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BadDogs.XYZ",
  description: "A web3 platform giving the power back to the holders.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({
  children,
  session,
}: {
  children: RootLayoutProps;
  session: Session;
}) {
  return (
    <ServerThemeProvider attribute="class">
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <Providers session={session}>
            <div>
              <Header01 />
              <>{children}</>
              <Toaster />
            </div>
          </Providers>

          <Footer />
          <BidsModal />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
