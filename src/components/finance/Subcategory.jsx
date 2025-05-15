"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopShotsAndPopularSection from "../adsection/adsection";
import axios from "axios";
import base_url from "@/components/helper/baseurl";

export const Subcategory = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const slugify = (text) =>
    text
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-"); // Replace multiple - with single -

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/filter1/${category}`);
        setData(response.data); // Fetch all subcategories, no filter
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white text-black">
      {/* Category Heading */}
      <h2 className="text-center  text-4xl md:text-5xl font-extrabold mb-5 mt-5 text-gray-800 tracking-wide">
        {category.toUpperCase()}
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-lg p-2 border border-gray-100 hover:shadow-xl transition overflow-hidden"
          >
            {/* Subcategory Name */}
            <h3 className="text-2xl font-bold text-center text-gray-800 border-b pb-2 mb-4">
              {item?.subcategory?.name || "Unnamed Subcategory"}
            </h3>
            <div className="space-y-2 border-gray-500">
              {console.log(item)}
              {/* CompBlog Card */}
              {item?.compBlogs?.length > 0 && (
                <Link
                  href={`/${item?.compBlogs[0]?.subcategories?.slug}/${item?.compBlogs[0]?.slug}`}
                  className="flex gap-4 hover:bg-gray-50 rounded-lg transition p-4"
                >
                  <img
                    src={
                      typeof item?.compBlogs[0]?.image === "string"
                        ? item?.compBlogs[0]?.image.startsWith("res") ||
                          item?.compBlogs[0]?.image.startsWith("http")
                          ? item?.compBlogs[0]?.image
                          : `${base_url}${item?.compBlogs[0]?.image}`
                        : item?.compBlogs[0]?.image?.url || ""
                    }
                    alt={item?.compBlogs[0]?.title}
                    className="w-24 h-24 md:w-32 md:h-28 object-cover rounded-md flex-shrink-0"
                  />

                  <div className="flex flex-col justify-between h-28 md:h-28 overflow-hidden gap-0">
                    <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item?.compBlogs[0]?.title}
                    </h4>
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {item?.compBlogs[0]?.mdesc}
                    </p>
                  </div>
                </Link>
              )}

              {/* More Blogs (Inside Same Card) */}
              {item?.blogs?.length > 0 && (
                <div className="space-y-2 border-gray-500 ">
                  {item.blogs.map((blog) => (
                    <Link
                      href={`/blog/${blog.slug}`}
                      key={blog._id}
                      className="flex gap-4 hover:bg-gray-50 rounded-lg transition p-4"
                    >
                      <img
                        src={
                          typeof blog.image === "string"
                            ? blog.image.startsWith("res") ||
                              blog.image.startsWith("http")
                              ? blog.image
                              : `${base_url}${blog.image}`
                            : blog.image?.url
                        }
                        alt={blog.title}
                        className="w-24 h-24 md:w-32 md:h-28 object-cover rounded-md flex-shrink-0"
                      />

                      <div className="flex flex-col justify-between h-28 md:h-28 overflow-hidden gap-2">
                        <h5 className="text-base font-semibold text-gray-800 line-clamp-1">
                          {blog.title}
                        </h5>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {blog.mdesc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <TopShotsAndPopularSection />
    </div>
  );
};

export default Subcategory;
