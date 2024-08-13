import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head />
    <body>
      <NavBar />
      <div className="flex">
        <SideBar />
        <main className="flex-grow p-4">
          {children}
        </main>
      </div>
    </body>
  </html>
  );
}
