"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopShotsAndPopularSection from "../adsection/adsection";
import axios from "axios";
import base_url from "@/components/helper/baseurl";

export const Subcategory = ({ category }) => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategoryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/filter1/${category}`);
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

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white text-black">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-5 mt-5 text-gray-800 tracking-wide">
        {category.toUpperCase()}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-16">
        {data.map((item, idx) => {
          const compBlogs = item.compBlogs || [];
          const blogs = item.blogs || [];
          const totalCount = compBlogs.length + blogs.length;
          const isExpanded = expanded[idx] || false;

          // Decide which items to show if not expanded:
          // Show 1 compBlog if exists, then fill remaining slots with blogs to max 2 total
          let visibleCompBlogs = [];
          let visibleBlogs = [];

          if (isExpanded) {
            // show all
            visibleCompBlogs = compBlogs;
            visibleBlogs = blogs;
          } else {
            if (compBlogs.length > 0) {
              visibleCompBlogs = compBlogs.slice(0, 1);
              visibleBlogs = blogs.slice(0, 2 - visibleCompBlogs.length);
            } else {
              visibleBlogs = blogs.slice(0, 2);
            }
          }

          return (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-lg p-2 border border-gray-100 hover:shadow-xl transition overflow-hidden"
            >
              <h3 className="text-2xl font-bold text-center text-gray-800 border-b pb-2 mb-4">
                {item?.subcategory?.name || "Unnamed Subcategory"}
              </h3>

              <div className="space-y-2 border-gray-500">
                {/* Show visible compBlogs */}
                {visibleCompBlogs.map((compBlog) => (
                  <Link
                    key={compBlog._id}
                    href={`/${compBlog?.subcategories?.slug}/${compBlog?.slug}`}
                    className="flex gap-4 hover:bg-gray-50 rounded-lg transition p-4"
                  >
                    <img
                      src={
                        typeof compBlog?.image === "string"
                          ? compBlog.image.startsWith("res") || compBlog.image.startsWith("http")
                            ? compBlog.image
                            : `${base_url}${compBlog.image}`
                          : compBlog?.image?.url || ""
                      }
                      alt={compBlog?.title}
                      className="w-24 h-24 md:w-32 md:h-28 object-cover rounded-md flex-shrink-0"
                    />

                    <div className="flex flex-col justify-between h-28 md:h-28 overflow-hidden gap-0">
                      <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {compBlog?.title}
                      </h4>
                      <p className="text-sm text-gray-700 line-clamp-3">{compBlog?.mdesc}</p>
                    </div>
                  </Link>
                ))}

                {/* Show visible normal blogs */}
                {visibleBlogs.length > 0 && (
                  <div className="space-y-2 border-gray-500">
                    {visibleBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/blog/${blog.slug}`}
                        className="flex gap-4 hover:bg-gray-50 rounded-lg transition p-4"
                      >
                        <img
                          src={
                            typeof blog.image === "string"
                              ? blog.image.startsWith("res") || blog.image.startsWith("http")
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
                          <p className="text-sm text-gray-600 line-clamp-3">{blog.mdesc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Load More button if total > 2 */}
                {totalCount > 2 && (
                  <div className="text-center mt-2">
                    <button
                      onClick={() => toggleExpand(idx)}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      {isExpanded ? "Show Less" : "Load More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TopShotsAndPopularSection />
    </div>
  );
};

export default Subcategory;
