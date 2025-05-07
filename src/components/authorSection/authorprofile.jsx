"use client";
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

  const usersRes = await fetch(`${base_url}/getUsers`);
  if (!usersRes.ok)
    return <p className="text-red-500 p-4">Failed to load users</p>;

  const allUsers = await usersRes.json();
  const author = allUsers.find((user) => user.username === slug);

  if (!author)
    return <p className="text-red-500 p-4">Author not found</p>;

  const blogsRes = await fetch(
    `${base_url}/blogs-by-user/${author._id}?page=${page}&limit=${limit}`
  );
  if (!blogsRes.ok)
    return <p className="text-red-500 p-4">Failed to load blogs</p>;

  const { blogs, totalPages } = await blogsRes.json();

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 bg-white text-black">
      {/* Author Card */}
      <div className="bg-gray-100 rounded-3xl p-6 shadow-lg mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={author.image || "/images/default-user.png"}
            alt={author.username}
            className="w-24 h-24 rounded-full object-cover border-2 border-black"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">{author.firstName} {author.lastName}</h1>
            <p className="text-sm text-gray-600 capitalize">{author.role || "Contributor"}</p>
            {author.status && <p className="text-sm text-gray-600">🟢 Status: {author.status}</p>}
            <p className="text-sm text-gray-600 mt-1">📚 Articles Written: {blogs.length}</p>
            {author.tag && <p className="text-sm text-gray-600 mt-1">🏷️ Tags: {author.tag}</p>}
            {/* Socials */}
            <div className="flex gap-3 mt-2 justify-center sm:justify-start">
              {author.socialMedia?.linkedin && (
                <Link href={author.socialMedia.linkedin} target="_blank">
                  <img src="/svg/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                </Link>
              )}
              {author.socialMedia?.twitter && (
                <Link href={author.socialMedia.twitter} target="_blank">
                  <img src="/svg/twitter.svg" alt="Twitter" className="w-5 h-5" />
                </Link>
              )}
              {author.socialMedia?.facebook && (
                <Link href={author.socialMedia.facebook} target="_blank">
                  <img src="/svg/facebook.svg" alt="Facebook" className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {author.shortBio && (
          <div
            className="mt-6 text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: author.shortBio }}
          />
        )}
      </div>

      {/* Posts List */}
      <h2 className="text-2xl font-semibold mb-4">📄 Latest Posts by {author.firstName || author.username}</h2>

      {blogs.length === 0 ? (
        <p className="text-gray-600">This author hasn't published any articles yet.</p>
      ) : (
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link
              key={i}
              href={`/author/${slug}?page=${i + 1}`}
              className={`px-3 py-1 rounded-md border text-sm ${
                i + 1 === page
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
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
