import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import RootProviders from "@/providers";
import '@mysten/dapp-kit/dist/index.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sui Tickets - Web3 Ticketing System",
  description: "Buy and manage event tickets on the Sui blockchain",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background antialiased`}
      >
        <RootProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
            </div>
          </ThemeProvider>
        </RootProviders>
      </body>
    </html>
  );
}
