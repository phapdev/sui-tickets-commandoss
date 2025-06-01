import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import RootProviders from "@/providers";

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
    <html lang="en">
      <body className={inter.className}>
        <RootProviders>
          {children}
          <Toaster />
        </RootProviders>
      </body>
    </html>
  );
}
