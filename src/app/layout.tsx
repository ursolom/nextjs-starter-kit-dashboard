import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PAGE_TITLES, SITE } from "@/constants";
import { Providers } from "@/providers";
import Header from "@/components/layout/header";
import { getUrl } from "@/helpers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: PAGE_TITLES.HOME,
  description: SITE.DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { url } = await getUrl();
  console.log(url)
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <div className="pt-24 relative bg-background text-text">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
