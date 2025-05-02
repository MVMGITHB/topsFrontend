import Navbar from "@/components/navbar/Navbar";
import "./globals.css";  // Assuming your global CSS file is linked here
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/components/context/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Ticker from "@/components/moving ticker/ticker";
import { newsItems } from "@/components/constants/constants";

export const metadata = {
  title: {
    template: "%s | Top 5 Shots - Latest Trends, Reviews & Insights",
  },
  title: "Top5Shots - Compare & Advertise",
  description: "Find the best websites for comparison and ad campaigns.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow"></meta>
      </head>
      <body className="bg-white text-black min-h-screen flex flex-col overflow-x-hidden">
        <AuthProvider>
          <Navbar />
          <Breadcrumb />
          <Ticker items={newsItems} className="p-10 ml-20 mt-15 mb-15" />
          <main className="flex-grow w-full px-4 sm:px-8 mx-auto max-w-7xl bg-white text-black">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
