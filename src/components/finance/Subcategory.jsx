"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AutoCarousel from "../carousel/AutoCarousel";
import TopShotsAndPopularSection from "../adsection/adsection";

export const Subcategory = ({ category, data }) => {
  const hasData = data && data.length > 0;

  return (
    <div className="text-black dark:text-white">
      {/* Category Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-10 text-gray-800 dark:text-gray-100 tracking-wide">
        {category.toUpperCase()}
      </h2>

      {/* Subcategory Cards */}
      {hasData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-16 gap-8 pb-12">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm hover:shadow-xl p-6 transition duration-300 ease-in-out"
            >
              <h4 className="text-xl text-center font-semibold text-gray-800 dark:text-white mb-4 underline decoration-sky-500 decoration-2 underline-offset-4">
                {item?.subcategories?.name}
              </h4>

              <div className="space-y-3">
                {item?.items?.map((item1, index1) => (
                  <Link
                    key={index1}
                    href={`/${category}/${item1?.slug}`}
                    className="flex items-center justify-between text-sm font-medium bg-blue-50 dark:bg-gray-700 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-blue-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 visited:text-gray-500 dark:visited:text-gray-400"
                  >
                    <span className="truncate">{item1?.title || "Untitled"}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 text-lg py-12">
          🚫 No blogs found in this category.
        </div>
      )}

      

      {/* Ad Section */}
      <div className="mt-14 px-4">
        <TopShotsAndPopularSection />
      </div>
    </div>
  );
};
