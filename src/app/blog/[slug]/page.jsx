
import base_url from "@/components/helper/baseurl";
import parse from "html-react-parser";

import generateBlogSchema from "@/components/helper/blogschema";
import Link from "next/link";
import AutoCarousel from "@/components/carousel/AutoCarousel";

export const dynamic = "force-dynamic";

// Dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return { title: "Blog Not Found | Top5Shots" };

    const blog = await res.json();

    return {
      title: `${blog.mtitle || blog.title} | Top5Shots`,
      description: blog.mdesc || blog.body?.slice(0, 160),
      openGraph: {
        title: blog.mtitle || blog.title,
        description: blog.mdesc || blog.body?.slice(0, 160),
        url: `https://top5shots.com/blogs/${slug}`,
        type: "article",
        images: [
          {
            url:
              typeof blog.image === "string"
                ? blog.image
                : blog.image?.url || "/images/default-banner.png",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.mtitle || blog.title,
        description: blog.mdesc || blog.body?.slice(0, 160),
        images: [
          typeof blog.image === "string"
            ? blog.image
            : blog.image?.url || "/images/default-banner.png",
        ],
      },
    };
  } catch {
    return {
      title: "Error Loading Blog | Top5Shots",
    };
  }
}

// Helper function to wrap tables in a responsive div
function wrapTablesInDiv(htmlString) {
  return htmlString.replace(
    /<table(.*?)>([\s\S]*?)<\/table>/g,
    `<div class="overflow-x-auto my-6"><table class="min-w-full table-auto border border-gray-300 text-sm"$1>$2</table></div>`
  );
}

// Page content
export default async function Article({ params }) {
  const { slug } = await params;
  let blog = null;
  var author = null;

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Blog not found");

    blog = await res.json();
    console.log(blog);

    // Handle ObjectId or raw string
    const userId =
      typeof blog.postedBy === "object" && blog.postedBy.$oid
        ? blog.postedBy.$oid
        : blog.postedBy;

    if (userId) {
      const userRes = await fetch(`${base_url}/singleUser/${userId}`, {
        cache: "no-store",
      });
      if (userRes.ok) {
        author = await userRes.json();

        // {
        //   _id: '68072bb750f0dcc61c301c23',
        //   email: 'anushka@gmail.com',
        //   username: 'anuskasharma'
        // }
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
    <section className="max-w-7xl mx-auto px-4 py-14 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-indigo-700/30 to-indigo-900/30 border border-white/10 rounded-2xl p-5 shadow-lg transition hover:scale-105 duration-300 text-center backdrop-blur-sm"
            >
              <img
                src="https://cdn.logojoy.com/wp-content/uploads/20250107124119/nike-shoe-logo.webp"
                alt="Special Offer"
                className="aspect-video object-cover rounded-xl shadow-md"
              />
              <p className="text-white font-semibold text-base mt-4 tracking-wide">
                Special Offer
              </p>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                Buy now
              </button>
            </div>
          ))}
        </aside>

        {/* Blog Main Content */}
        <main className="w-full lg:w-2/3 bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
          <header className="border-b pb-4 mb-6 border-gray-200">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              {blog.mtitle || blog.title}
            </h1>
            <div className="text-sm text-gray-600 space-y-3">
              <p>
                <strong className="text-gray-800">Posted:</strong>{" "}
                {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {/* {blog?.postedBy && (
              <p className="mt-2 text-sm text-black bg-red">
                <span className="font-medium text-black bg-white text-transform: uppercase">
                  {" "}
                  Author: {blog?.postedBy.username}
                </span>
              </p>
            )} */}
              {blog?.postedBy && (
                <p className="mt-2 text-sm text-black bg-red">
                  <Link
                    href={`/author/${blog?.postedBy.username}`}
                    className="text-indigo-600 hover:underline"
                  >
                    Author: {blog?.postedBy.username}
                  </Link>
                </p>
              )}
            </div>

            {blog.mdesc && (
              <p className="mt-3 text-lg text-gray-600 max-w-3xl">
                {blog.mdesc}
              </p>
            )}
          </header>

          {blog.image && (
            <img
              src={typeof blog.image === "string" ? blog.image : blog.image.url}
              alt={blog.title}
              className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg"
            />
          )}

          <article
            className="prose prose-lg max-w-4xl w-full px-4 sm:px-6 text-gray-800 
                       prose-headings:font-semibold prose-img:rounded-xl 
                       prose-a:text-indigo-600 hover:prose-a:underline mx-auto"
          >
            {parse(wrapTablesInDiv(blog.body))}
          </article>

          <div className="mt-10 overflow-hidden rounded-xl shadow-md">
            <AutoCarousel />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <img
                src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                alt="New Arrival"
                className="aspect-video object-cover rounded-lg shadow-sm"
              />
              <p className="text-gray-900 font-semibold text-base mt-4 tracking-wide">
                New Arrival
              </p>
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition">
                Shop now
              </button>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
} ///in this component check i have added comment what is the problem //and fix it please
