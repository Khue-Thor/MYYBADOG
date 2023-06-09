"use client";

import { ThemeProvider } from "@wits/next-themes";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import {
  ChainId,
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
} from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <ThirdwebProvider
            activeChain="ethereum"
            supportedWallets={[metamaskWallet(), coinbaseWallet()]}
            authConfig={{
              // Set this to your domain to prevent phishing attacks
              domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
              authUrl: "/api/auth",
            }}
          >
            {children}
          </ThirdwebProvider>
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}
