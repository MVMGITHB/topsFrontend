import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/components/context/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { BackgroundBeamsWithCollision } from "@/components/ui/BackgroundBeamwithCollision";
import SurveyPopup from "@/components/popupsurvey/popupsurvey";

export const metadata = {
  title :{
    template: "%s | Top 5 Shots - Latest Trends, Reviews & Insights",
  },
  title: "Top5Shots - Compare & Advertise",
  description: "Find the best websites for comparison and ad campaigns.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-white min-h-screen flex flex-col overflow-x-hidden">
       
       
        <AuthProvider>
          
          <Navbar />
         
          <Breadcrumb />
          <main className="flex-grow w-full px-4 sm:px-8 mx-auto max-w-7xl">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
