"use client"
import base_url from "@/components/helper/baseurl";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug} | Author at Top5Shots`,
    description: `Read all articles written by ${params.slug} on Top5Shots`,
    openGraph: {
      title: `${params.slug} | Author Profile`,
      url: `https://top5shots.com/author/${params.slug}`,
    },
  };
}

export default async function AuthorPage({ params, searchParams }) {
  const { slug } = params;
  const page = parseInt(searchParams?.page || "1");
  const limit = 6;

  // Fetch all users and find the one by slug (username)
  const usersRes = await fetch(`${base_url}/getUsers`);
  if (!usersRes.ok) return <p className="text-red-500 p-4">Failed to load users</p>;

  const allUsers = await usersRes.json();
  const author = allUsers.find((user) => user.username === params.slug);

  if (!author) return <p className="text-red-500 p-4">Author not found</p>;

  // Fetch blogs by the found author
  const blogsRes = await fetch(`${base_url}/blogs-by-user/${author._id}?page=${page}&limit=${limit}`);
  if (!blogsRes.ok) return <p className="text-red-500 p-4">Failed to load blogs</p>;

  const { blogs, totalPages } = await blogsRes.json();

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 bg-white text-black">
      <div className="bg-gray-100 rounded-3xl p-6 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={author.photo || "/images/default-user.png"}
            alt={author.username}
            className="w-24 h-24 rounded-full object-cover border-2 border-black"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{author.firstName} {author.lastName}</h1>
            <p className="text-sm text-gray-600">{author.role || "Contributor"}</p>
            {author.status && <p className="text-sm text-gray-600">🟡 Status: {author.status}</p>}
            <p className="text-sm text-gray-600 mt-1">📚 Articles Written: {blogs.length}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">📄 Latest Posts by {author.firstName || author.username}</h2>

      <ul className="space-y-4">
        {blogs.map((post) => (
          <li key={post._id}>
            <Link
              href={`/finance/${post.slug}`}
              className="block bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-sm text-gray-700">
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
    </section>
  );
}
