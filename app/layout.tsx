import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import RootProviders from "@/providers";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sui Ticket DApp",
  description: "A decentralized ticket marketplace built on Sui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://sui-tickets-commandoss.vercel.app/view?id=1748759438387" />
          <meta name="twitter:title" content="Sui Ticket DApp" />
          <meta name="twitter:description" content="A decentralized ticket marketplace built on Sui" />
          <meta name="twitter:player" content="https://sui-tickets-commandoss.vercel.app/view?id=1748759438387" />
          <meta name="twitter:player:width" content="580" />
          <meta name="twitter:player:height" content="680" />
          <meta name="twitter:image" content="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/659d95d2971219c839dc65ac_logo-sui.svg" />
          <meta property="og:url" content="https://sui-tickets-commandoss.vercel.app/view?id=1748759438387" />
          <meta property="og:title" content="Sui Ticket DApp" />
          <meta property="og:description" content="A decentralized ticket marketplace built on Sui" />
          <meta property="og:image" content="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/659d95d2971219c839dc65ac_logo-sui.svg" />
      </head>
      <body className={inter.className}>
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
          <Toaster position="top-right" closeButton />
        </RootProviders>
      </body>
    </html>
  );
}
