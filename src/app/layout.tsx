import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { Header, SideBar } from "@/components";
import ClientProviders from "@/provider/ClientProviders";
import { admin } from "@/utils";
import "./globals.css";

const openSans = Open_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TailorTech | Super Admin Dashboard",
  description: "Dashboard for TailorTech",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ClientProviders>
          <div
            className={`w-ful flex h-[100dvh] flex-col items-start justify-start gap-0 ${openSans.className}`}
          >
            <Header />
            <div className="flex h-[calc(100%-60px)] w-full gap-[0px]">
              <SideBar navlinks={admin} />
              <main className="h-full w-full overflow-auto p-[20px] md:p-[30px]">{children}</main>
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
