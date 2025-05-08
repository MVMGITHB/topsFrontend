"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";
import Link from "next/link";

// NewsCard component
const NewsCard = ({ title, source, date, image, updatedAt }) => {
  const formattedDateTime = new Date(updatedAt || date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="h-44 flex flex-col justify-between p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out mx-2">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={source}
          className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
        />
        <div>
          <h3 className="text-md font-semibold text-gray-800">{source}</h3>
          <p className="text-xs text-gray-500">{formattedDateTime}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-grow">
        "{title}"
      </p>
    </div>
  );
};

// Main Carousel component
export default function Crousel() {
  const [shorts, setShorts] = useState([]);
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchTopShorts = async () => {
      try {
        const res = await fetch(
          "https://api.top5shots.com/api/topHeading-shorts/getAlltopHeading"
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const allCompBlogs = data.flatMap((item) => item.compBlog || []);
          setShorts(allCompBlogs);

          const blogDetails = await Promise.all(
            allCompBlogs.map(async (blog) => {
              const res = await axios.get(
                `${base_url}/getOnecompblogs/${blog.slug}`
              );
              return res.data;
            })
          );

          const blogMap = {};
          blogDetails.forEach((blog) => {
            blogMap[blog.slug] = blog;
          });

          setBlogs(blogMap);
        }
      } catch (err) {
        console.error("Error fetching top shorts:", err);
      }
    };

    fetchTopShorts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
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
    <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-3 px-5 md:px-10 mb-5">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">
        Trending Top Headlines
      </h2>
      <div className="max-w-7xl mx-auto">
        <Slider {...settings}>
          {shorts.map((blog) => (
            <div key={blog.id}>
              <Link href={`/${blog?.subcategories?.slug}/${blog.slug}`}>
                <NewsCard
                  title={blog.title}
                  source={blog.source || "Top5Shots"}
                  date={blog.date}
                  updatedAt={blog.updatedAt}
                  image={blog.image || "/default.jpg"}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
