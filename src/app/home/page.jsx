import Header from "@/components/header/Header";
import CategoryPage from "@/components/categories/Categories";
import AutoPlay from "@/components/carousel/Carousel";
import AdsSection from "@/components/adsection/adsection";

import Crousel from "@/components/carousel/Carousel2";
import { CardBody, CardContainer } from "@/components/ui/Card3d";


function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-5">

      {/* Responsive Layout for Header + Categories */}
      <div className="flex flex-col lg:flex-row">
        {/* Header on top (mobile) or left side (desktop) */}
        <div className="w-full lg:w-1/3">
          <Header />
        </div>

        {/* Categories on right side (desktop) or below header (mobile) */}
        <div className="w-full lg:w-2/3 px-4 py-4">
          <CategoryPage />
        </div>
      </div>

      {/* Other components below the header/categories section */}
      <AutoPlay />
      
      <AdsSection />
      
      
      
      <Crousel />
      
    </div>
  );
}

export default Page;
