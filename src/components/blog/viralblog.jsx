"use client";

import parse from "html-react-parser";
import Link from "next/link";
import AutoCarousel from "@/components/carousel/AutoCarousel";
import { RightSideBar } from "@/components/blog/RightSideBar";
import { SideBar } from "@/components/blog/SideBar"; // 👈 Create or import this component
import base_url from "../helper/baseurl";

function wrapTablesInDiv(htmlString) {
  return htmlString.replace(
    /<table(.*?)>([\s\S]*?)<\/table>/g,
    `<div class="overflow-x-auto my-6"><table class="min-w-full border border-gray-300 text-sm"$1>$2</table></div>`
  );
}

export default function ArticleContent({ blog }) {
  const isVideo =
    typeof blog.image === "string" && blog.image.toLowerCase().endsWith(".mp4");

  const imageSrc =
    typeof blog.image === "string"
      ? blog.image.startsWith("http")
        ? blog.image
        : `${base_url}${blog.image}`
      : blog.image?.url || "/images/default-image.jpg";

  return (
    <section className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar */}
      <aside className="lg:col-span-2 hidden lg:block">
        <SideBar
          categorySlug={blog?.categories?.slug || blog?.category?.slug || ""}
        />
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-8 space-y-10">
        {/* Header */}
        <header className="space-y-4 border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {blog.mtitle || blog.title}
          </h1>
          {blog.mdesc && (
            <p className="text-lg text-gray-600 italic">{blog.mdesc}</p>
          )}

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <span className="font-medium">Category:</span>{" "}
              {blog.categories?.name}
              {blog.subcategories?.name ? ` / ${blog.subcategories.name}` : ""}
            </p>
            <p>
              <span className="font-medium">Posted on:</span>{" "}
              {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {blog.postedBy?.slug && (
              <p>
                <span className="font-medium">Author:</span>{" "}
                <Link
                  href={`/author/${blog.postedBy.slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  {blog.postedBy.username}
                </Link>
              </p>
            )}
          </div>
        </header>

        {/* Media */}
        <div className="aspect-video rounded-xl overflow-hidden shadow-md bg-black">
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
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/images/default-image.jpg";
              }}
            />
          )}
        </div>

        {/* Body */}
        <article className="prose prose-lg max-w-none text-gray-800 prose-headings:font-semibold prose-a:text-indigo-600 hover:prose-a:underline prose-img:rounded-xl">
          {parse(wrapTablesInDiv(blog.body))}
        </article>

        {/* FAQs */}
        {blog.faqs?.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {blog.faqs.map((faq) => (
                <details
                  key={faq._id}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50"
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
      </main>

      {/* Right Sidebar */}
      <aside className="lg:col-span-2 hidden lg:block">
        <RightSideBar
          categorySlug={blog?.categories?.slug || blog?.category?.slug || ""}
        />
      </aside>
    </section>
  );
}
