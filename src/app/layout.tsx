import "@/styles/globals.css";
import { Inter } from "next/font/google";

import { ServerThemeProvider } from "next-themes";
import { Providers } from "../components/providers";
import Header01 from "@/components/ui/header/header01";
import Footer from "../components/ui/footer";
import "@/styles/custom.css";
import BidsModal from "@/components/modal/BidsModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BadDogs.XYZ",
  description: "A web3 platform giving the power back to the holders.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // header start
  let header;
  // if (
  //   route.asPath === "/home/home_3" ||
  //   route.asPath === "/home/home_9" ||
  //   route.asPath === "/maintenance" ||
  //   route.asPath === "/home/home_12"
  // ) {
  //   header = <Header02 />;
  // } else if (route.asPath === "/platform_status") {
  //   header = <Header03 />;
  // } else if (route.asPath === "/home/home_8") {
  //   header = <Header04 />;
  // } else {
  //   header = <Header01 />;
  // }
  // header end

  return (
    <ServerThemeProvider attribute="class">
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <Providers>
            <Header01 />
            {/* {header} */}
            {children}
          </Providers>
          <Footer />
          <BidsModal />
        </body>
      </html>
    </ServerThemeProvider>
  );
}
