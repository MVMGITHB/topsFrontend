import CategoryPage from "../categories/Categories";
import Header from "../header/Header";
import AdsSection from "../adsection/adsection";
import AutoCarousel from "../carousel/AutoCarousel";

// import Chatbot from "../aichatbot/chatbot";
import Crousel from "../carousel/Carousel2";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-2">

      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3">
          <Header />
        </div>

        <div className="w-full lg:w-2/3 px-2 py-1 mb-2">
          <CategoryPage />
        </div>
      </div>

      {/* Other components below the header/categories section */}
      <AutoCarousel />
      <AdsSection />

      {/* <Chatbot /> */}
      <Crousel />
    </div>
  );
}

export default Home;
