"use client";

import { ThemeProvider } from "@wits/next-themes";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThirdwebProvider
          activeChain="ethereum"
          authConfig={{
            // Set this to your domain to prevent phishing attacks
            domain: "localhost",
            // The URL of your Auth API
            authUrl: "/api/auth",
          }}
        >
          {children}
        </ThirdwebProvider>
      </ThemeProvider>
    </Provider>
  );
}
