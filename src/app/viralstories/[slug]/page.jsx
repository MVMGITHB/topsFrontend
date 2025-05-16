"use client";

import base_url from "@/components/helper/baseurl";
import generateBlogSchema from "@/components/helper/blogschema";
import SeoMeta from "@/components/helper/jsonld/seo";

import ArticleContent from "@/components/blog/viralblog";
import AutoCarousel from "@/components/carousel/AutoCarousel";

export const dynamic = "force-dynamic";

export default async function Article({ params }) {
  const { slug } = await params;
  let blog = null;
  let author = null;

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Viral Story not found");

    blog = await res.json();

    const userId = blog.postedBy?._id || blog.postedBy;
    if (userId) {
      const userRes = await fetch(`${base_url}/singleUser/${userId}`, {
        cache: "no-store",
      });
      if (userRes.ok) {
        author = await userRes.json();
      }
    }
  } catch (error) {
    return (
      <div className="p-6 text-center text-white">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error</h1>
        <p className="text-gray-300">{error.message}</p>
      </div>
    );
  }

  const blogSchema = generateBlogSchema(blog, author);

  return (
    <section className="max-w-8xl mx-auto text-white">
      <SeoMeta
        title={blog.mtitle || blog.title}
        description={blog.mdesc || "Read viral stories on Top5Shots"}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Viral Stories", url: "/viralstories" },
          { name: blog.title, url: `/viralstories/${blog.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="flex flex-col lg:flex-row gap-20">
        <ArticleContent blog={blog} />
      </div>

      <div className="lg:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-md text-center"
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
