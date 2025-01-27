import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Separator from "@/components/Separator";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Spotify 2.0",
  description: "é o spotify 2, desgraça",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <Header />
        <Separator />
        {children}
      </body>
    </html>
  );
}
