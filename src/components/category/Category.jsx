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
        console.log("Fetched categories:", res.data); // ✅ Check the response
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    const categoryName = cat.name?.toLowerCase().replace(/\s+/g, "-"); // Format category name
    const categorySlug = cat.slug; // Use the slug directly from the fetched category
    
    if (categoryName && categorySlug) {
      router.push(`/category/${categoryName}/${categorySlug}`); // Construct the correct URL
    }
  };

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Explore Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className="cursor-pointer bg-white text-gray-900 rounded-2xl p-6 h-40 flex flex-col items-center justify-center gap-3 text-center border border-gray-200 hover:bg-purple-600 hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
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
