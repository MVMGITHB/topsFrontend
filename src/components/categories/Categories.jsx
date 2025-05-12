"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import base_url from "../helper/baseurl";

// Optional fallback icons if API doesn’t return them
const fallbackIcons = {
  Automobile: "/images/car.png",
  "Fashion and Lifestyle": "/images/fashion.png",
  Fitness: "/svg/fitness.svg",
  Ecommerce: "/images/ecommerce.png",
  Finance: "/images/finance.png",
  "Real Estate": "/images/realestate.png",
  Gaming: "/images/gaming.png",
  Politics: "/images/politics.png",
  Sport: "/images/sports.png",
  Education: "/images/education.png",
  Travel: "/svg/travel.svg",
};

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(base_url + "/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    const categorySlug = cat.slug?.toLowerCase();
    if (categorySlug) {
      router.push(`/${categorySlug}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-auto">
      <div className="px-5">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-7  ">
          {categories.map((cat, index) => {
            const title = cat.title || cat.name || "Unnamed";
            const icon =
              cat.icon || fallbackIcons[title] || "/images/fashion.png";

            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className="relative cursor-pointer bg-white text-black rounded-2xl p-4 h-32 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2c003e] hover:to-[#4B0082] hover:text-white hover:shadow-lg hover:scale-105 focus:bg-gradient-to-br focus:from-[#2c003e] focus:to-[#4B0082] focus:text-white focus:shadow-lg focus:scale-105 font-serif"
              >
                {/* Left Decorative Image */}
                {/* <img
                  src="/images/left-decor.png"
                  alt="Left decoration"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8"
                /> */}

                {/* Right Decorative Image */}
                {/* <img
                  src="/images/right-decor.png"
                  alt="Right decoration"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8"
                /> */}

                {/* Center Icon */}
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="w-20 h-18 mb-2 transition-transform duration-300"
                />
                <span className="font-light text-xl sm:text-base transition-colors duration-300">
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}