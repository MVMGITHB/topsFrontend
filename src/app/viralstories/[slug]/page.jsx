import ArticleContent from "@/components/blog/viralblog";
import base_url from "@/components/helper/baseurl";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const slug = params?.slug;
  if (!slug) {
    return {
      title: "Invalid story - Top5Shots",
      description: "No story slug provided.",
    };
  }

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Viral story not found");
    const story = await res.json();

    return {
      title: story.mtitle || story.title,
      description: story.mdesc || "Read the latest viral stories on Top5Shots",
      alternates: {
        canonical: `https://www.top5shots.com/viralstories/${story.slug}`,
      },
      openGraph: {
        title: story.mtitle || story.title,
        description: story.mdesc || "",
        url: `https://www.top5shots.com/viralstories/${story.slug}`,
        images: [
          {
            url:
              typeof story.image === "string"
                ? story.image.includes("res")
                  ? story.image
                  : `${base_url}${story.image}`
                : story.image?.url || "/default-og.jpg",
            alt: story.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: story.mtitle || story.title,
        description: story.mdesc || "",
        images: [
          typeof story.image === "string"
            ? story.image.includes("res")
              ? story.image
              : `${base_url}${story.image}`
            : story.image?.url || "/default-og.jpg",
        ],
      },
    };
  } catch (err) {
    return {
      title: "Viral story not found - Top5Shots",
      description: "The viral story you are looking for doesn't exist.",
    };
  }
}

export default async function ViralStoryPage({ params }) {
  const slug = params?.slug;
  if (!slug) {
    return <p>Invalid story slug.</p>;
  }

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      notFound();
    }
    const blog = await res.json();
    return <ArticleContent blog={blog} />;
  } catch (error) {
    return <p>Error loading story.</p>;
  }
}
