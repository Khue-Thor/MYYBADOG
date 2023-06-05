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
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  User,
  Session,
} from "@supabase/auth-helpers-react";
import { useState } from "react";

import { AppProps } from "next/app";
// interface Session {
//   user: User;
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   refresh_token: string;
// }

export function Providers({ children }: { children: React.ReactNode }) {
  // let pageProps: Session;
  // const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <Provider store={store}>
      {/* <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps}
      > */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThirdwebProvider
          activeChain="ethereum"
          supportedWallets={[metamaskWallet(), coinbaseWallet()]}
          authConfig={{
            // Set this to your domain to prevent phishing attacks
            domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN,
            // The URL of your Auth API
            authUrl: "/api/auth",
          }}
        >
          {children}
        </ThirdwebProvider>
      </ThemeProvider>
      {/* </SessionContextProvider> */}
    </Provider>
  );
}
