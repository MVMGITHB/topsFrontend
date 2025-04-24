import base_url from "@/components/helper/baseurl";

export const dynamic = "force-dynamic";

export default async function BlogListingPage() {
  let blogs = [];

  try {
    const res = await fetch(`${base_url}/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    blogs = await res.json();
  } catch (error) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Error loading blogs: {error.message}
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-14 text-white">
    <div className="flex flex-col lg:flex-row gap-10">
  
      {/* Left Sidebar - Mobile: stacked on top */}
      <aside className="w-full lg:max-w-xs flex flex-col gap-6 order-1 lg:order-none">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-indigo-700/30 to-indigo-900/30 border border-white/10 rounded-2xl p-5 shadow-lg transition hover:scale-105 duration-300 text-center backdrop-blur-sm"
          >
            <img
              src="https://cdn.logojoy.com/wp-content/uploads/20250107124119/nike-shoe-logo.webp"
              alt="Special Offer"
              className="w-full aspect-video object-cover rounded-xl shadow-md"
            />
            <h3 className="text-white font-semibold text-base mt-4 tracking-wide">
              Special Offer
            </h3>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Buy now
            </button>
          </div>
        ))}
      </aside>
  
      {/* Blog Main Content */}
      <main className="w-full lg:flex-1 bg-white text-gray-900 rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
        <header className="border-b pb-4 mb-6 border-gray-200">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {blog.mtitle || blog.title}
          </h1>
          {blog.mdesc && (
            <p className="mt-3 text-lg text-gray-600 max-w-3xl">{blog.mdesc}</p>
          )}
        </header>
  
        {blog.image && (
          <img
            src={typeof blog.image === "string" ? blog.image : blog.image.url}
            alt={blog.title}
            className="w-full h-auto aspect-video object-cover rounded-xl shadow-lg"
          />
        )}
  
        <div className="text-sm text-gray-600 space-y-3">
          <p>
            <strong className="text-gray-800">Posted:</strong>{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <strong className="text-gray-800">Category:</strong>{" "}
            {Array.isArray(blog.subcategories)
              ? blog.subcategories.map((cat, i) => (
                  <span key={i} className="text-indigo-600 font-medium mr-2 underline">
                    {cat.name}
                  </span>
                ))
              : "Uncategorized"}
          </p>
          <p>
            <strong className="text-gray-800">Tags:</strong>{" "}
            {Array.isArray(blog.tags)
              ? blog.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-xs rounded-full mr-2"
                  >
                    #{tag.name}
                  </span>
                ))
              : "No tags"}
          </p>
        </div>
  
        <article
          className="prose prose-lg max-w-none text-gray-800 prose-headings:font-semibold prose-img:rounded-xl prose-a:text-indigo-600 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        />
  
        <div className="mt-10 overflow-hidden rounded-xl shadow-md">
          <AutoCrousel />
        </div>
      </main>
  
      {/* Right Sidebar - Mobile: stacked at the bottom */}
      <aside className="w-full lg:max-w-xs flex flex-col gap-6 order-2 lg:order-none">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            <img
              src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
              alt="New Arrival"
              className="w-full aspect-video object-cover rounded-lg shadow-sm"
            />
            <h3 className="text-gray-900 font-semibold text-base mt-4 tracking-wide">
              New Arrival
            </h3>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition">
              Shop now
            </button>
          </div>
        ))}
      </aside>
    </div>
  </section>
  
  );
}
