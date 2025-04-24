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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-16">
        Discover Our Latest Blogs
      </h1>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <a
            key={blog._id}
            href={`/blogs/${blog.slug}`}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.015] hover:shadow-amber-300/10"
          >
            {blog.image && (
              <div className="overflow-hidden h-56">
                <img
                  src={typeof blog.image === "string" ? blog.image : blog.image?.url}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}
            <div className="p-6 md:p-7 text-black space-y-4">
              <h2 className="text-2xl font-semibold leading-snug group-hover:text-amber-400">
                {blog.mtitle || blog.title}
              </h2>
              <p className="text-black text-sm leading-relaxed line-clamp-3">
                {blog.mdesc || blog.body?.slice(0, 120)}...
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-black">
                <span className="text-sm text-amber-300 font-medium">
                  Read more →
                </span>
                <span className="text-xs text-black">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
