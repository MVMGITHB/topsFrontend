import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/components/context/auth";
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
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="bg-white text-black flex flex-col min-h-screen overflow-x-hidden">
        <AuthProvider>
          <Navbar />

          {/* Moving Ticker */}
          <div className="w-full bg-gray-100 ">
            <div >
              <Ticker items={newsItems} />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-grow w-full bg-white text-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
