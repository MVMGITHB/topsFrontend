"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
];

export default function AutoCrousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "30px",
  };

  return (
    <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-amber-300 to-indigo-700 p-8">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="px-2">
            {/* Ensures spacing between slides */}
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[200px] h-[100px] object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
