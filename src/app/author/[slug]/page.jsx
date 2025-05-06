import base_url from "@/components/helper/baseurl";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  return {
    title: `${params?.slug} | Author at Top5Shots`,
    description: `Read all articles written by ${params?.slug} on Top5Shots`,
    openGraph: {
      title: `${params.slug} | Author Profile`,
      url: `https://top5shots.com/author/${params?.slug}`,
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = params;

  // Fetch all users and find the one by slug (username)
  const usersRes = await fetch(`${base_url}/getUsers`);
  if (!usersRes.ok) {
    return <p className="text-red-500 p-4">Failed to load users</p>;
  }

  const allUsers = await usersRes.json();
  const author = allUsers.find((user) => user?.username === slug);
  console.log(author)

  if (!author) {
    return <p className="text-red-500 p-4">Author not found</p>;
  }

  const authorId = author._id?.$oid || author._id; 
  const authorCreatedAt = new Date(author.createdAt?.$date || author.createdAt).toLocaleDateString();

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 bg-white text-black">
      {/* Author Profile */}
      <div className="bg-gray-100 rounded-3xl p-6 shadow-xl mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={author.photo || "/images/default-user.png"}
            alt={author.username}
            className="w-24 h-24 rounded-full object-cover border-2 border-black"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold">
              {author.firstName} {author.lastName}
            </h1>
            <p className="text-sm text-gray-600">{author.role || "Contributor"}</p>
            {author.status && (
              <p className="text-sm text-gray-600">🟡 Status: {author.status}</p>
            )}
            <p className="text-sm text-gray-600 mt-1">📅 Joined: {authorCreatedAt}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
