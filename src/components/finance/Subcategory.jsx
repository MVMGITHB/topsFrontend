"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AutoCarousel from "../carousel/AutoCarousel";
import TopShotsAndPopularSection from "../adsection/adsection";
import axios from "axios";
import base_url from "@/components/helper/baseurl";

export const Subcategory = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/filter/${category}`);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching subcategory data:", err);
        setError("Failed to load subcategory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [category]);

  const hasData = data && data.length > 0;

  return (
    <div className="bg-white text-black">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-5 mt-5 text-gray-800 tracking-wide">
        {category.toUpperCase()}
      </h2>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : hasData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-16 gap-8 pb-12">
          {data.map((item, index) => (
            <div
              key={item?.subcategories?.slug || index}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl p-6 transition duration-300 ease-in-out"
            >
              <h4 className="text-xl text-center font-semibold text-gray-800 mb-4 underline decoration-sky-500 decoration-2 underline-offset-4">
                {item?.subcategories?.name}
              </h4>

              <div className="space-y-3">
                {item?.items?.map((item1, index1) => (
                  <Link
                    key={item1?.slug || index1}
                    href={`/${item.subcategories?.slug}/${item1?.slug}`}
                    className="flex items-center justify-between text-sm font-medium bg-blue-50 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-blue-100 text-blue-600 visited:text-gray-500"
                    title={item1?.title}
                    aria-label={`Read more about ${item1?.title}`}
                  >
                    <span className="truncate">
                      {item1?.title || "Untitled"}
                    </span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg py-12">
          🚫 No blogs found in this category.
        </div>
      )}

      <div className=" px-4">
        <TopShotsAndPopularSection />
      </div>
    </div>
  );
};
