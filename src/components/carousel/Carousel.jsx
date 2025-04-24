"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  {
    title: "Fashion and LifeStyle",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Home",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Fitness",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Ecommerce",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Finance",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Real Estate",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Gaming",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Politics",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Education",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
  {
    title: "Travel",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg",
  },
];

export default function AutoCarousel({children}) {
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
  };

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-amber-300 to-indigo-700 p-8 my-20">
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="px-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[140px] object-cover"
              />
              <div className="p-3 text-center text-black font-semibold text-sm">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
