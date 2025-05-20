"use client";

import parse from "html-react-parser";
import Link from "next/link";
import { useState } from "react";
import AutoCarousel from "@/components/carousel/AutoCarousel";
import { RightSideBar } from "@/components/blog/RightSideBar";
import { SideBar } from "@/components/blog/SideBar";
import base_url from "../helper/baseurl";
import SeoMeta from "../helper/jsonld/seo";
import generateBlogSchema from "../helper/blogschema";
function wrapTablesInDiv(htmlString) {
  if (typeof htmlString !== "string") return ""; // Guard against undefined or non-string
  return htmlString.replace(
    /<table(.*?)>([\s\S]*?)<\/table>/g,
    `<div class="overflow-x-auto my-6"><table class="min-w-full table-auto border border-gray-300 text-sm"$1>$2</table></div>`
  );
}

export default function ArticleContent({ blog }) {
   const [author, setAuthor] = useState(null);
  const blogSchema = generateBlogSchema(blog, author);

  if (blog.createdAt && blog.updatedAt) {
    blogSchema.datePublished = new Date(blog.createdAt).toISOString();
    blogSchema.dateModified = new Date(blog.updatedAt).toISOString();
  }
  const isVideo =
    typeof blog.image === "string" && blog.image.toLowerCase().endsWith(".mp4");

  const imageSrc =
    typeof blog.image === "string"
      ? blog.image.startsWith("http")
        ? blog.image
        : `${base_url}${blog.image}`
      : blog.image?.url || "/images/default-image.jpg";

  return (
    <section className="max-w-8xl mx-auto text-white">
      <SeoMeta
        title={blog.mtitle || blog.title}
        description={blog.mdesc || "Read the latest insights on Top5Shots"}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "ViralStories", url: "/blogs" },
          { name: blog.title, url: `/viralstories/${blog.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/6 order-2 md:order-1">
          <SideBar
            categorySlug={blog?.categories?.slug || blog?.category?.slug || ""}
          />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/5 bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-lg order-1 md:order-2 space-y-10">
          {/* Header */}
          <header className="border-b border-gray-200 pb-4">
            <h1 className="text-4xl font-bold">{blog.title}</h1>
            {blog.mdesc && (
              <p className="mt-3 text-base text-gray-600">{blog.mdesc}</p>
            )}
            <div className="text-sm text-gray-600 mt-2 space-y-1">
              <p>
                <strong className="text-gray-800">Posted:</strong>{" "}
                {blog.updatedAt
                  ? new Date(blog.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown"}
              </p>
              {blog.postedBy?.slug && (
                <p>
                  <Link
                    href={`/author/${blog.postedBy.slug}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Author: {blog.postedBy.username}
                  </Link>
                  <br />
                  Category: {blog.categories?.name || blog.category?.name}
                </p>
              )}
            </div>
          </header>

          {/* Featured Media */}
          <div className="w-full max-h-[500px] overflow-hidden rounded-xl bg-gray-100">
            {isVideo ? (
              <video
                src={imageSrc}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={imageSrc}
                alt={blog.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = "/images/default-image.jpg";
                }}
              />
            )}
          </div>

          {/* Blog Content */}
          <article className="prose prose-lg max-w-full text-gray-800 prose-headings:font-semibold prose-img:rounded-xl prose-a:text-indigo-600 hover:prose-a:underline">
            {blog.body ? (
              parse(wrapTablesInDiv(blog.body))
            ) : (
              <p>No content available.</p>
            )}
          </article>

          {/* FAQ Section */}
          {blog.faqs?.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {blog.faqs.map((faq) => (
                  <details
                    key={faq._id}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <summary className="cursor-pointer font-medium text-gray-800">
                      {faq.ques}
                    </summary>
                    <p className="mt-2 text-gray-700">{faq.ans}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Conclusion */}
          {blog.conclusion && (
            <section className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold mb-2">Conclusion</h2>
              <div className="text-base text-gray-700 leading-relaxed">
                {parse(blog.conclusion)}
              </div>
            </section>
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
