"use client";

import Link from "next/link";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <section className="w-full bg-white ">
      <h2 className="text-3xl font-bold font-serif text-center text-gray-800 mb-4 mt-2">
        Top Shots
      </h2>

      <div className="max-w-10xl mx-auto px-4 sm:px-6 md:px-8">
        <Slider {...settings}>
          {shorts.map((item, index) => {
            const blog = blogs[item.slug];
            if (!blog) return null;

            return (
              <div key={index} className="px-2 sm:px-4">
                <Link href={`/${blog?.subcategories?.slug}/${blog.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg border border-gray-200 transition duration-300 hover:-translate-y-1 cursor-pointer h-64 flex flex-col">
                    <img
                      src={
                        typeof blog.image === "string"
                          ? blog.image.includes("res")
                            ? blog.image
                            : `${base_url}${blog.image}`
                          : blog.image?.url
                      }
                      alt={blog.title}
                      className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="p-4 text-center text-black font-medium text-md sm:text-base line-clamp-2 flex-1">
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
