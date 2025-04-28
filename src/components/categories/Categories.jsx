"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import base_url from "../helper/baseurl";

// Optional fallback icons if API doesn’t return them
const fallbackIcons = {
  Automobile: "/images/bike.png",
  "Fashion and Lifestyle": "/images/fashion.png",
  Fitness: "/svg/fitness.svg",
  Ecommerce: "/svg/ecommerce.svg",
  Finance: "/images/finance.png",
  "Real Estate": "/svg/realestate.svg",
  Gaming: "/svg/gaming.svg",
  Politics: "/svg/politics.svg",
  Sport: "/svg/sports.svg",
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
    <div className="max-w-7xl mx-auto min-h-screen">
      <div className="px-5">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 ">
          {categories.map((cat, index) => {
            const title = cat.title || cat.name || "Unnamed";
            const icon = cat.icon || fallbackIcons[title] || "/svg/default.svg";

            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className="cursor-pointer bg-white text-black rounded-2xl p-4 h-28 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2c003e] hover:to-[#4B0082] hover:text-white hover:shadow-lg hover:scale-105 focus:bg-gradient-to-br focus:from-[#2c003e] focus:to-[#4B0082] focus:text-white focus:shadow-lg focus:scale-105 font-mono"
              >
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="w-10 h-10 mb-2  transition-transform duration-300"
                />
                <span className="font-semibold text-sm sm:text-base transition-colors duration-300">
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
