"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { title: "Fashion and Lifestyle", image: "/images/fash.jpg" },
  { title: "Home", image: "/images/home.jpg" },
  { title: "Fitness", image: "/images/fit.jpg" },
  { title: "Ecommerce", image: "/images/ecom.jpg" },
  { title: "Finance", image: "/images/fin.jpg" },
  { title: "Real Estate", image: "/images/real.jpg" },
  { title: "Gaming", image: "/images/game.jpg" },
  { title: "Politics", image: "/images/poli.jpg" },
  { title: "Education", image: "/images/educ.jpg" },
  { title: "Travel", image: "/images/trav.jpg" },
];

export default function AutoCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    centerMode: true,
    centerPadding: "32px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, centerPadding: "24px" },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: "20px" },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-r from-slate-100 to-slate-200 py-14 px-6 sm:px-10 mt-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 tracking-tight">
         Top Shots
      </h2>

      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {categories.map((item, index) => (
            <div key={index} className="px-4">
              <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 transition-transform duration-300 transform hover:-translate-y-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 sm:h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-4 text-center text-gray-800 font-medium text-sm sm:text-base">
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
