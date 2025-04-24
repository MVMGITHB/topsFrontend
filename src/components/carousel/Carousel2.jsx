"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsCard = ({ title, source, date, image }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out mx-2">
    <div className="flex items-center gap-4 mb-4">
      <img
        src={image}
        alt={source}
        className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
      />
      <div>
        <h3 className="text-md font-semibold text-gray-800">{source}</h3>
        <p className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">"{title}"</p>
  </div>
);

export default function Crousel() {
  const news = [
    {
      id: 1,
      title: "OpenAI announces GPT-5 with major upgrades in reasoning and memory",
      source: "TechCrunch",
      date: "2025-04-08T09:00:00Z",
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=openai",
    },
    {
      id: 2,
      title: "Apple unveils its first fully AI-powered MacBook at Spring event",
      source: "The Verge",
      date: "2025-04-06T10:30:00Z",
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=apple",
    },
    {
      id: 3,
      title: "NASA confirms Artemis II will orbit the Moon this year",
      source: "BBC News",
      date: "2025-04-04T15:45:00Z",
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=nasa",
    },
    {
      id: 4,
      title: "Tesla rolls out full self-driving beta in Europe",
      source: "Reuters",
      date: "2025-04-07T08:00:00Z",
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=tesla",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-12 px-6 md:px-16 mb-20">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Trending Top Headlines</h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {news.map((article) => (
            <NewsCard key={article.id} {...article} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
