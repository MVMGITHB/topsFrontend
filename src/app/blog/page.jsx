"use client";

import base_url from "@/components/helper/baseurl";
import { useEffect, useState } from "react";
import Link from "next/link";
import SeoMeta from "@/components/helper/jsonld/seo";

export const dynamic = "force-dynamic";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${base_url}/getAllArticle`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        console.log(data);
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Error loading blogs: {error}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 text-center">
        Latest Blog Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className=" h-full bg-white text-gray-900 rounded-2xl shadow-lg p-6 duration-300 flex flex-col border border-gray-200 transition hover:shadow-lg hover:scale-[1.01]"
          >
            <SeoMeta
              title={blog.mtitle || blog.title}
              description={
                blog.mdesc || "Read the latest insights on Top5Shots"
              }
              breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "Blogs", url: "/blogs" },
                { name: blog.title, url: `/blogs/${blog.slug}` },
              ]}
            />
            <img
              src={
                typeof blog.image === "string"
                  ? blog.image.includes("res")
                    ? blog.image
                    : `${base_url}${blog.image}`
                  : blog.image?.url
              }
              alt={blog.title}
              className="w-full aspect-video object-top rounded-xl mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">
              {blog.mtitle || blog.title}
            </h2>
            {blog.mdesc && (
              <p className="text-sm text-gray-600 mb-3">{blog.mdesc}</p>
            )}

            <div className="text-xs text-gray-500 mb-2">
              Posted on:{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <div className="flex flex-wrap gap-2 mb-4 mt-1">
              {Array.isArray(blog.tags) &&
                blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 text-xs rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
            </div>

            <Link
              href={`/blog/${blog.slug}`}
              className="mt-auto inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
