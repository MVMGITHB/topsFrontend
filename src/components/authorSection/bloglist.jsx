import Link from "next/link";

export default function BlogList({ blogs, slug, page, totalPages }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📄 Latest Posts</h2>

      <ul className="space-y-4">
        {blogs.map((post) => (
          <li key={post._id}>
            <Link
              href={`/finance/${post.slug}`}
              className="block bg-white border border-gray-200 hover:shadow-md transition rounded-lg p-4"
            >
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/author/${slug}?page=${i + 1}`}
              className={`px-3 py-1 rounded-md border ${
                i + 1 === page ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
