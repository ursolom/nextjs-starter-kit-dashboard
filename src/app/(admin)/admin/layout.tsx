import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PAGE_TITLES, PAGES, SITE } from "@/constants";
import { Providers } from "@/providers";
import Header from "@/components/layout/header";
import { getUser } from "@/lib/user";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

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
  const user = await getUser();

  if (!user) {
    redirect(PAGES.ADMIN.LOGIN);
  }
  if (user.role === Role.USER) {
    redirect(PAGES.USER.ACCOUNT);
  }
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
