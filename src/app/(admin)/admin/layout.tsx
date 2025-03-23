import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PAGE_TITLES, PAGES, SITE } from "@/constants";
import { getUser } from "@/lib/user";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import AppLayout from "@/components/admin/layout/app-layout";

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
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect(PAGES.ADMIN.LOGIN);
  }
  if (user.role === Role.USER) {
    redirect(PAGES.USER.ACCOUNT);
  }

  return (
    <AppLayout>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {children}
        </div>
      </div>
    </AppLayout>
  );
}
