"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/category");
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    const categoryName = cat.name?.toLowerCase().replace(/\s+/g, "-");
    const categorySlug = cat.slug;
    if (categoryName && categorySlug) {
      router.push(`/category/${categoryName}/${categorySlug}`);
    }
  };

  return (
    <div
      className="px-4 py-12 max-w-7xl mx-auto bg-white text-black font-serif"
      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-800 tracking-tight">
        🗂️ Explore Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="cursor-pointer bg-white text-black rounded-2xl p-6 h-40 flex flex-col items-center justify-center gap-3 text-center border border-gray-200 hover:bg-purple-600 hover:text-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <img
              src={cat.img}
              alt={cat.title || cat.name || "Category"}
              className="w-14 h-14 object-contain"
            />
            <span className="font-semibold text-sm sm:text-base">
              {cat.title || cat.name || "Unnamed"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
