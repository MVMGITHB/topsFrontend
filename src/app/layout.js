"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/components/context/auth";
import Ticker from "@/components/moving ticker/ticker";

import { newsItems } from "@/components/constants/constants";
import "./globals.css";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/images/favicon.ico"
          type="image/x-icon"
          sizes="16x16"
        />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-white text-black flex flex-col min-h-screen overflow-x-hidden">
        <AuthProvider>
          <Navbar />

          {/* ✅ Show Ticker only on home, Breadcrumb otherwise */}
          <div className="w-full bg-gray-100">
            {isHome ? <Ticker items={newsItems} /> : <Breadcrumb />}
          </div>

          {/* Main content */}
          <main className="flex-grow w-full bg-white text-black">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
