"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import base_url from "../helper/baseurl";


const cat = [
  { title: "Automobile", img: "" },
  { title: "Fashion and Lifestyle", img: "/images/fashion.png" },
  { title: "Home", img: "/images/fashion.png" },
  { title: "Fitness", img: "/images/fitness.png" },
  { title: "Ecommerce", img: "/images/ecommerce.png" },
  { title: "Finance", img: "/images/finance.png" },
  { title: "Real Estate", img: "/images/realestate.png" },
  { title: "Gaming", img: "/images/fashion.png" },
  { title: "Politics", img: "/images/politics.png" },
  { title: "Education", img: "/images/education.png" },
  { title: "Travel", img: "/images/travel.png" },
];
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
    <div className="px-4 py-10 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-black tracking-wide font-serif">
        🎯 Explore Categories
      </h2>

      <div className="px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(cat)}
              className="cursor-pointer bg-white text-black rounded-2xl p-4 h-28 flex items-center justify-center text-center shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2c003e] hover:to-[#4B0082] hover:text-white hover:shadow-lg hover:scale-105 font-mono"
            >
              <span className="font-semibold text-base sm:text-lg transition-colors duration-300">
              {/* <LogoIcon className="w-8 h-8 text-blue-500" /> */}
                {cat.title || cat.name || "Unnamed"}
              </span>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
