"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// ----> DATA
const shotData = [
  {
    id: 1,
    title: "America Puts Reciprocal Tariffs",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVvOlhJpA7cIdQHShXA9t4GXFs3MlgOEf3jw&s",
    date: "March 11, 2024",
    author: "NewsExpress",
    label: "TopShots",
  },
  {
    id: 2,
    title: "5 Best Laptops for Students in 2024",
    image: "/images/Laptop.jpg",
    date: "April 5, 2024",
    author: "Top5Shots",
    label: "Top Pick",
  },
];

const sideCards = [
  {
    title: "Most Searched Shots",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVvOlhJpA7cIdQHShXA9t4GXFs3MlgOEf3jw&s",
    
    cta: "Check Searches",
  },
  {
    title: "Top 5 Shopping Offers",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
    cta: "Grab Deals",
  },
];

// ----> ARROWS
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronRight size={16} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronLeft size={16} />
  </div>
);

// ----> SHOT SLIDE
const CarouselCard = ({ shot }) => (
  <div className="relative h-80 overflow-hidden rounded-xl shadow-md">
    <img
      src={shot.image}
      alt={shot.title}
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
    <div className="absolute inset-0  bg-opacity-50 p-4 flex flex-col justify-end">
      <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
        {shot.label}
      </span>
      <h2 className="text-white text-lg font-semibold">{shot.title}</h2>
      <div className="flex items-center gap-2 text-xs text-gray-200 mt-1">
        <span>{shot.date}</span>
        <span className="text-black">•</span>
        <span>{shot.author}</span>
      </div>
    </div>
  </div>
);

// ----> SIDE CARD
const SideCard = ({ title, imageUrl, cta }) => (
  <div
    className="flex flex-col justify-end h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-cover bg-center"
    style={{ backgroundImage: `url(${imageUrl})` }}
  >
    <div className="p-6 bg-black/40 backdrop-blur-sm h-full flex flex-col justify-end">
      <p className="text-white text-xl font-semibold mb-3">{title}</p>
      <button className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition">
        {cta}
      </button>
    </div>
  </div>
);

// ----> FINAL COMPONENT
export default function TopShotsAndPopularSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  

  return (
    <section className="w-full px-6 py-16 bg-gradient-to-r from-gray-100 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          🔥 Most Popular & Top Shots
        </h2>

        {/* Carousel Section */}

      {/* Carousel Section */}
<div className="flex justify-center mb-12">
  <div className="w-full max-w-5xl px-4">
  <Slider {...settings}>
  {shotData.map((shot) => (
    <div key={shot.id} className="px-2"> {/* 👈 Adds horizontal gap */}
      <CarouselCard shot={shot} />
    </div>
  ))}
</Slider>
  </div>
</div>

        {/* Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sideCards.map((card, i) => (
            <SideCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
