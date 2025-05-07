"use client";

import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { title: "Fashion and Lifestyle", image: "/images/fash.jpg", slug: "fashion-and-lifestyle" },
  { title: "Home", image: "/images/home.jpg", slug: "home" },
  { title: "Fitness", image: "/images/fit.jpg", slug: "fitness" },
  { title: "Ecommerce", image: "/images/ecom.jpg", slug: "ecommerce" },
  { title: "Finance", image: "/images/fin.jpg", slug: "finance" },
  { title: "Real Estate", image: "/images/real.jpg", slug: "real-estate" },
  { title: "Gaming", image: "/images/game.jpg", slug: "gaming" },
  { title: "Politics", image: "/images/poli.jpg", slug: "politics" },
  { title: "Education", image: "/images/educ.jpg", slug: "education" },
  { title: "Travel", image: "/images/trav.jpg", slug: "travel" },
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
    <section className="bg-gradient-to-r bg-white py-2 px-2 sm:px-10 mt-3">
      <h2 className="text-3xl font-bold font-serif text-center text-gray-800 mb-4">
        Top Shots
      </h2>

      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {categories.map((item, index) => (
            <div key={index} className="px-4">
              <Link href={`/${item.slug}`}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 transition-transform duration-300 transform hover:-translate-y-1 cursor-pointer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 sm:h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4 text-center text-gray-800 font-medium text-sm sm:text-base">
                    {item.title}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
