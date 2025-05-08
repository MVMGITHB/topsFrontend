import base_url from "@/components/helper/baseurl";
import AuthorJsonLd from "@/components/helper/jsonld/authorjsonld";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Fetch the author based on the slug
  const usersRes = await fetch(`${base_url}/getUsers`);
  if (!usersRes.ok) {
    return {
      title: `${slug} | Author at Top5Shots`,
      description: `Read all articles written by ${slug} on Top5Shots`,
      openGraph: {
        title: `${slug} | Author Profile`,
        description: `Read all articles written by ${slug} on Top5Shots`,
        url: `https://top5shots.com/author/${slug}`,
      },
    };
  }

  const allUsers = await usersRes.json();
  const author = allUsers.find((user) => user?.username === slug);

  // If author is not found, return default metadata
  if (!author) {
    return {
      title: `${slug} | Author at Top5Shots`,
      description: `Read all articles written by ${slug} on Top5Shots`,
      openGraph: {
        title: `${slug} | Author Profile`,
        url: `https://top5shots.com/author/${slug}`,
      },
    };
  }

  // Author metadata
  const authorFullName = `${author.firstName} ${author.lastName}`;
  const authorImage =
    author.image || "https://top5shots.com/images/default-user.png";

  return {
    title: `${authorFullName} | Author at Top5Shots`,
    description: `Read all articles written by ${authorFullName} on Top5Shots`,
    openGraph: {
      title: `${authorFullName} | Author Profile`,
      description: `Read all articles written by ${authorFullName} on Top5Shots`,
      url: `https://top5shots.com/author/${slug}`,
      image: authorImage,
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;

  const usersRes = await fetch(`${base_url}/getUsers`);
  if (!usersRes.ok) {
    return <p className="text-red-500 p-4">Failed to load users</p>;
  }

  const allUsers = await usersRes.json();
  const author = allUsers.find((user) => user?.username === slug);

  if (!author) {
    return <p className="text-red-500 p-4">Author not found</p>;
  }

  const authorCreatedAt = new Date(
    author.createdAt?.$date || author.createdAt
  ).toLocaleDateString();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 bg-gray-50">
      <AuthorJsonLd author={author} />

      {/* Author Profile Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <img
            src={author.image || "/images/default-user.png"}
            alt={author.username}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md transition-transform duration-300 transform hover:scale-105"
          />

          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">
              {author.firstName.charAt(0).toUpperCase() +
                author.firstName.slice(1)}{" "}
              {author.lastName.charAt(0).toUpperCase() +
                author.lastName.slice(1)}
            </h1>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-full shadow-md">
                🧑‍💼 {author.role || "Contributor"}
              </span>
              {author.status && (
                <span className="px-4 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-full shadow-md">
                  🟡 {author.status}
                </span>
              )}
              {author.tag && (
                <span className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded-full shadow-md">
                  🏷️ {author.tag}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-600">
              📅 Joined on: {authorCreatedAt}
            </p>

            {author.shortBio && (
              <p
                className="text-lg text-gray-800 mt-6 italic leading-relaxed font-medium tracking-wide shadow-lg p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                dangerouslySetInnerHTML={{ __html: author.shortBio }}
              />
            )}
            {author.blog && (
              <span className="px-4 py-2 text-sm bg-purple-100 text-purple-800 rounded-full shadow-md">
               
                📘 {author.blog}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
