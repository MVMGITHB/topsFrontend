"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewCard = ({ avatar, name, rating, review }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out mx-2">
    <div className="flex items-center gap-4 mb-4">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full border-2 border-blue-500" />
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="text-yellow-400">
          {"★".repeat(rating)}<span className="text-gray-300">{"★".repeat(5 - rating)}</span>
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">"{review}"</p>
  </div>
);

export default function Crousel() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      rating: 5,
      review: "This product exceeded my expectations!",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      rating: 4,
      review: "Great value for money. Would recommend.",
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      rating: 5,
      review: "Absolutely love it! So easy to use.",
    },
    {
      id: 4,
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      rating: 4,
      review: "Very impressed with the quality!",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-6 md:px-16 mb-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        What Our Customers Say
      </h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
