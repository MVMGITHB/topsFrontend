"use client";

import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  {
    title: "Fashion and Lifestyle",
    image: "/images/fash.jpg",
    slug: "fashion-and-lifestyle",
  },
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

  const [shorts, setShorts] = useState([]);
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchTopShorts = async () => {
      try {
        const res = await fetch(
          "https://api.top5shots.com/api/tops-shorts/getAllTopShorts"
        );
        const data = await res.json();
        // console.log("Top Shorts Raw Data:", data);

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

  return (
    <section className="bg-gradient-to-r bg-white py-2 px-2 sm:px-10 ">
      <h2 className="text-3xl font-bold font-serif text-center text-gray-800 mb-4">
        Top Shots
      </h2>

      <div className="max-w-8xl mx-auto ">
        <Slider {...settings}>
          {shorts.map((item, index) => {
            const blog = blogs[item.slug];
            if (!blog) return null;

            // console.log("From carousel:", blog.subcategories.slug);

            return (
              <div key={index} className="px-4 mb-3">
                <Link href={`/${blog?.subcategories?.slug}/${blog.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 transition-transform duration-300 transform hover:-translate-y-1 cursor-pointer h-64 flex flex-col">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4 text-center text-gray-800 font-medium text-sm sm:text-base line-clamp-2 flex-1">
                      {blog.title}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
}
