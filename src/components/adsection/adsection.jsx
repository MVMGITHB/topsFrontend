"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  {
    title: "Contests",
    imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c44367b",
    cta: "Join Now",
  },
  {
    title: "Top5deals",
    imageUrl: "https://images.unsplash.com/photo-1605902711622-cfb43c44367b",
    cta: "Join Now",
  },
];

// Arrows
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronRight size={16} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronLeft size={16} />
  </div>
);

// Card Base Layout
const CardLayout = ({ image, title, label, cta, date, author }) => (
  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col justify-end p-4">
      {label && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
          {label}
        </span>
      )}
      <h2 className="text-white text-lg font-semibold mb-1">{title}</h2>
      {date && author && (
        <div className="flex items-center gap-2 text-xs text-gray-200">
          <span>{date}</span>
          <span className="text-white">•</span>
          <span>{author}</span>
        </div>
      )}
      {cta && (
        <button className="mt-3 bg-white text-black py-1 px-4 rounded hover:bg-gray-100 text-sm w-fit">
          {cta}
        </button>
      )}
    </div>
  </div>
);

export default function TopShotsAndPopularSection() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 8000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <section className="w-full bg-white py-5 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
           Trending Shots
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left - Carousel */}
          <div className="flex-1 min-w-0">
            <Slider {...sliderSettings}>
              {shotData.map((shot) => (
                <div key={shot.id} className="px-2">
                  <CardLayout
                    image={shot.image}
                    title={shot.title}
                    label={shot.label}
                    date={shot.date}
                    author={shot.author}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Right - Static Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {sideCards.map((card, idx) => (
              <CardLayout
                key={idx}
                image={card.imageUrl}
                title={card.title}
                cta={card.cta}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
