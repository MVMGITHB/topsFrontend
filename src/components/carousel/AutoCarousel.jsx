"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { title: "Fashion and LifeStyle", image: "/images/fash.jpg" },
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
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    centerMode: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 1024, // tablets & small desktops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // mobile
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-amber-300 to-indigo-700 sm:px-6 lg:px-8 my-14">
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[140px] sm:h-[160px] object-cover"
              />
              <div className="p-3 text-center text-black font-semibold text-sm sm:text-base">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
