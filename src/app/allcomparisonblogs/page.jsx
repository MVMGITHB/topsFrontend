"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import TopShotsAndPopularSection from "@/components/adsection/adsection";
import base_url from "@/components/helper/baseurl";

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/getALlcompblogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 px-4 sm:px-6 lg:px-12 py-12">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-12">
        All Comparison Blogs
      </h1>

      {blogs?.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No blogs available.
        </p>
      )}

      {blogs.map((blog) => (
        <div key={blog._id} className="mb-20">
          {/* Blog Title & Meta Description */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
              {blog.mdesc}
            </p>
          </div>

          {/* Company Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blog.company?.map((comp, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={comp.logo}
                    alt={comp.websiteName}
                    className="w-14 h-14 object-contain rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {comp.websiteName}
                  </h3>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(Math.floor(comp.rating))].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {comp.rating?.toFixed(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {comp.features?.[0] || "No feature listed."}
                </p>

                <Link
                  href={comp.visitSiteUrl}
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Visit Site <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Optional Ad Section */}
      <div className="mt-24">
        <TopShotsAndPopularSection />
      </div>
    </div>
  );
}
