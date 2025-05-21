"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import base_url from "../helper/baseurl";

const TopShorts = React.memo(({ subcategorySlug }) => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    const fetchAllCompBlogs = async () => {
      try {
        const res = await axios.get(`${base_url}/getALlcompblogs`);
        if (Array.isArray(res.data)) {
          setAllBlogs(res.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllCompBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!subcategorySlug) return [];
    return allBlogs.filter((blog) => {
      const sub = blog.subcategories;
      if (Array.isArray(sub)) {
        return sub.some((s) => s.slug === subcategorySlug);
      } else {
        return sub?.slug === subcategorySlug;
      }
    });
  }, [allBlogs, subcategorySlug]);

  const getImageUrl = (image) => {
    if (!image) return null;
    return typeof image === "string"
      ? image.includes("res")
        ? image
        : `${base_url}${image}`
      : image.url || null;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-5 bg-white rounded-3xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-black mb-6 text-center tracking-tight">
        Compare Best Plans For{" "}
        <span className="text-blue-600">{subcategorySlug}</span>
      </h2>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium">
          No top shorts found for this subcategory.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((blog) => {
            const imageUrl = getImageUrl(blog.image);

            return (
              <article
                key={blog._id}
                className="flex flex-col bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 group overflow-hidden"
              >
                {imageUrl && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                      priority={false}
                    />
                  </div>
                )}

                <div className="flex flex-col flex-grow px-6 py-5">
                  <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  <p className="flex-grow text-gray-700 text-sm leading-relaxed line-clamp-4 mb-6">
                    {blog.mdesc}
                  </p>

                  <a
                    href={`/${blog.subcategories?.slug || subcategorySlug}/${blog.slug}`}
                    className="inline-block bg-blue-600 text-white font-semibold rounded-full px-5 py-2 text-sm shadow-md hover:bg-blue-700 transition-colors duration-300 self-start"
                    aria-label={`Read more about ${blog.title}`}
                  >
                    Read more &rarr;
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
});

export default TopShorts;
