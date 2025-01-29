import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Separator from "@/components/Separator";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "Spotify 2.0",
  description: "é o spotify 2, desgraça",
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="min-h-screen">
      <body
        className={`${dmSans.className} antialiased min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <Separator />
          {children}
          <Separator />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
