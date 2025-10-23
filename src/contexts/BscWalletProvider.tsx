"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

// Configure chains
const chains = [bsc, bscTestnet] as const;

// Create wagmi config
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: chains,
    transports: {
      // RPC URL for each chain
      [bsc.id]: http(
        process.env.NEXT_PUBLIC_BSC_RPC_URL || "https://bsc-dataseed1.binance.org"
      ),
      [bscTestnet.id]: http(
        process.env.NEXT_PUBLIC_BSC_TESTNET_RPC_URL ||
          "https://data-seed-prebsc-1-s1.binance.org:8545"
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "BNB Token Launchpad",

    // Optional App Info
    appDescription: "Launch your BEP-20 tokens on BSC",
    appUrl: "https://yourapp.com",
    appIcon: "https://yourapp.com/logo.png",
  })
);

const queryClient = new QueryClient();

export const BscWalletProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

