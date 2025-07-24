import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import ClientProviders from "@/provider/ClientProviders";
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
