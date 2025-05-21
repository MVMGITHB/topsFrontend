"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import base_url from "../helper/baseurl";

// Fallback icons
const fallbackIcons = {
  Automobile: "/newicons/Automobile2.png",
  Lifestyle: "/newicons/Lifestyle1.png",
  Fashion: "/newicons/Fashion2.png",
  Fitness: "/newicons/fitness.svg",
  Ecommerce: "/newicons/Ecommerce1.png",
  Finance: "/newicons/Finance1.png",
  "Real Estate": "/newicons/RealEst2.png",
  Gaming: "/newicons/Gaming3.png",
  Politics: "/newicons/politics.png",
  Sports: "/newicons/Sports1.png",
  Education: "/newicons/Education3.png",
  Travel: "/newicons/Travel3.png",
};

const fallbackIconsleft = {
  Automobile: "/newicons/Automobile1.png",
  Lifestyle: "/newicons/Lifestyle1.png",
  Fashion: "/newicons/Fashion1.png",
  Fitness: "/newicons/fitness.svg",
  Ecommerce: "/newicons/Ecommerce1.png",
  Finance: "/newicons/Finance1.png",
  "Real Estate": "/newicons/RealEst3.png",
  Gaming: "/newicons/Gaming2.png",
  Politics: "/newicons/politics.png",
  Sports: "/newicons/Sports2.png",
  Education: "/newicons/Education1.png",
  Travel: "/newicons/Travel2.png",
};

const fallbackIconsright = {
  Automobile: "/newicons/Automobile3.png",
  Lifestyle: "/newicons/Lifestyle2.png",
  Fashion: "/newicons/Fashion2.png",
  Fitness: "/newicons/fitness.svg",
  Ecommerce: "/newicons/Ecommerce2.png",
  Finance: "/newicons/Finance3.png",
  "Real Estate": "/newicons/RealEst2.png",
  Gaming: "/newicons/Gaming3.png",
  Politics: "/newicons/politics.png",
  Sports: "/newicons/Sports3.png",
  Education: "/newicons/Education2.png",
  Travel: "/newicons/Travel4.png",
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
    <div className="max-w-7xl mx-auto h-auto px-2 ">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-7">
        {categories.slice(0, 9).map((cat, index) => {
          const title = cat.title || cat.name || "Unnamed";
          const icon = cat.icon || fallbackIcons[title];
          const leftIcon = fallbackIconsleft[title];
          const rightIcon = fallbackIconsright[title];

          // Hide the 9th item (index 8) on small screens
          const responsiveClass = index === 8 ? "hidden sm:flex" : "flex";

          return (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className={`relative cursor-pointer ${responsiveClass} bg-gray-100 text-black rounded-2xl p-4 h-32 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2c003e] hover:to-[#4B0082] hover:text-white hover:shadow-lg hover:scale-105 font-sans`}
            >
              {/* Icon - Large and on top */}
              {icon && (
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="w-14 h-14 sm:w-20 sm:h-15 object-contain mb-2"
                />
              )}

              {/* Title - Below icon */}
              <span className="text-base sm:text-2xl font-serif">{title}</span>

              {/* Left & Right Bottom Icons */}
              {/* <div className="relative w-full h-0">
                {leftIcon && (
                  <img
                    src={leftIcon}
                    alt={`${title} left icon`}
                    className="absolute bottom-2 left-2 w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                )}
                {rightIcon && (
                  <img
                    src={rightIcon}
                    alt={`${title} right icon`}
                    className="absolute bottom-2 right-2 w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                )}
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
