"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import base_url from "../helper/baseurl";

export const RightSideBar = ({ categorySlug }) => {
  const [similarBlogs, setSimilarBlogs] = useState([]);

  useEffect(() => {
    if (!categorySlug) return;

    axios
      .get(`${base_url}/similarBlog/${categorySlug}`)
      .then((res) => {
        let blogs = res.data || [];

        // Sort by date (latest first)
        blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Set only top 3 latest blogs
        setSimilarBlogs(blogs.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching similar blogs:", err));
  }, [categorySlug]);

  return (
    <aside className="w-full lg:max-w-xs flex flex-col gap-6 px-4 pt-6 sticky top-20 z-10">
      {similarBlogs.length > 0 && (
        <div className="bg-white p-6 shadow-xl border border-gray-200 transition-all duration-300">
          <p className="text-center text-xl font-bold text-black mb-4 border-b border-gray-300 pb-2">
            Similar Articles
          </p>
          <div className="grid gap-6">
            {similarBlogs.map((blog, idx) => (
              <Link
                key={idx}
                href={`/blog/${blog.slug}`}
                className="flex flex-col hover:bg-gray-50 transition border border-transparent hover:border-gray-200 p-3"
              >
                <div className="w-full h-40 overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={
                      typeof blog.image === "string"
                        ? blog.image.includes("res")
                          ? blog.image
                          : `${base_url}${blog.image}`
                        : blog.image?.url
                    }
                    alt={blog.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-black leading-snug line-clamp-3 text-center">
                  {blog.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
