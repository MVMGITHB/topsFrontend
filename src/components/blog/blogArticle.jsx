"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import parse from "html-react-parser";
import base_url from "@/components/helper/baseurl";
import generateBlogSchema from "@/components/helper/blogschema";
import AutoCarousel from "@/components/carousel/AutoCarousel";
import SeoMeta from "@/components/helper/jsonld/seo";
import { RightSideBar } from "./RightSideBar";
import { SideBar } from "./SideBar";
import FAQ from "../faq/faq";

function wrapTablesInDiv(htmlString) {
  return htmlString.replace(
    /<table(.*?)>([\s\S]*?)<\/table>/g,
    `<div class="overflow-x-auto my-6"><table class="min-w-full table-auto border border-gray-300 text-sm"$1>$2</table></div>`
  );
}

export default function BlogArticle({ slug }) {
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${base_url}/blogs/${slug}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Blog not found");
        const data = await res.json();
        console.log(data);
        setBlog(data);

        const userId =
          typeof data.postedBy === "object" && data.postedBy.$oid
            ? data.postedBy.$oid
            : data.postedBy;

        if (userId) {
          const userRes = await fetch(`${base_url}/singleUser/${userId}`, {
            cache: "no-store",
          });
          if (userRes.ok) {
            const userData = await userRes.json();
            setAuthor(userData);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  if (error) {
    return (
      <div className="p-6 text-center text-white">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  const blogSchema = generateBlogSchema(blog, author);

  if (blog.createdAt && blog.updatedAt) {
    blogSchema.datePublished = new Date(blog.createdAt).toISOString();
    blogSchema.dateModified = new Date(blog.updatedAt).toISOString();
  }

  return (
    <section className="max-w-8xl mx-auto font-roboto  text-white">
      {/* Meta and Schema */}
      <SeoMeta
        title={blog.mtitle || blog.title}
        description={blog.mdesc || "Read the latest insights on Top5Shots"}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blogs", url: "/blogs" },
          { name: blog.title, url: `/blogs/${blog.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/6 order-2 md:order-1">
          <SideBar />
        </aside>

        {/* Article */}
        <main className="w-full md:w-3/5 bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-lg order-1 md:order-2 space-y-10">
          {/* Title & Meta */}
          <header className="border-b border-gray-200 pb-4">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            <div className="text-sm text-black mt-2 space-y-1">
              <p>
                <strong className="text-black">Posted:</strong>{" "}
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {blog?.postedBy && (
                <p>
                  <Link
                    href={`/author/${blog?.postedBy.slug}`}
                    className="text-black hover:underline"
                  >
                    Author:{" "}
                    <span className="text-indigo-600 hover:underline">
                      {blog?.postedBy.username}
                    </span>
                  </Link>
                  <br />
                  Category:{" "}
                  <span className="text-black hover:underline">
                    {blog?.categories?.name}
                  </span>
                </p>
              )}
            </div>
            {blog.mdesc && (
              <p className="mt-3 text-base text-black">{blog.mdesc}</p>
            )}
          </header>

          {/* Featured Image */}
          {blog.image && (
            <div className="w-full max-h-[500px] overflow-hidden rounded-xl bg-gray-100">
              <img
                src={
                  typeof blog.image === "string"
                    ? blog.image.includes("res")
                      ? blog.image
                      : `${base_url}${blog.image}`
                    : blog.image?.url
                }
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Blog Content */}
          <article className="prose prose-lg max-w-full text-gray-800 prose-headings:font-semibold prose-img:rounded-xl prose-a:text-indigo-600 hover:prose-a:underline">
            {parse(wrapTablesInDiv(blog.body))}
          </article>

          {/* FAQ */}
          {Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
            <FAQ data={blog.faqs} conclusion={blog.conclusion} />
          )}

          {/* Carousel */}
          <AutoCarousel />
        </main>

        {/* Right Sidebar */}
        <aside className="w-full md:w-1/4 order-3">
          <RightSideBar
            categorySlug={blog?.categories?.slug || blog?.category?.slug || ""}
          />
        </aside>
      </div>

      {/* Mobile Ads */}
      <div className="md:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow text-center"
          >
            <img
              src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
              alt="Ad"
              className="aspect-video object-cover rounded-lg"
            />
            <p className="text-gray-900 font-medium text-sm mt-3">Ad</p>
          </div>
        ))}
      </div>
    </section>
  );
}
