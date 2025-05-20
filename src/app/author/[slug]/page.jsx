// app/author/[slug]/page.jsx

import AuthorPage from "@/components/authorSection/authorprofile";

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const res = await fetch(
      `https://api.top5shots.com/singleUserbyslug/${slug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      return {
        title: "Author Not Found",
        description: "No author information available",
        alternates: {
          canonical: `https://top5shots.com/author/${slug}`,
        },
      };
    }

    const data = await res.json();
    const author = data[0];

    if (!author) {
      return {
        title: "Author Not Found",
        description: "No author information available",
        alternates: {
          canonical: `https://top5shots.com/author/${slug}`,
        },
      };
    }

    const fullName = `${author.firstName} ${author.lastName}`;

    return {
      title: fullName,
      description:
        author.shortBio ||
        `Read articles and posts by ${fullName} on Top5Shots.`,
      alternates: {
        canonical: `https://top5shots.com/author/${slug}`,
      },
      openGraph: {
        title: fullName,
        description:
          author.shortBio ||
          `Read articles and posts by ${fullName} on Top5Shots.`,
        url: `https://top5shots.com/author/${slug}`,
        images: [
          author.image
            ? author.image.startsWith("http")
              ? author.image
              : `https://top5shots.com${author.image}`
            : "https://top5shots.com/images/default-user.png",
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fullName,
        description:
          author.shortBio ||
          `Read articles and posts by ${fullName} on Top5Shots.`,
        images: [
          author.image
            ? author.image.startsWith("http")
              ? author.image
              : `https://top5shots.com${author.image}`
            : "https://top5shots.com/images/default-user.png",
        ],
      },
    };
  } catch (error) {
    return {
      title: "Author",
      description: "Author information could not be loaded",
      alternates: {
        canonical: `https://top5shots.com/author/${slug}`,
      },
    };
  }
}

export default function Page({ params }) {
  return <AuthorPage slug={params.slug} />;
}
