import ViralStoriesListing from "@/components/blog/viralist";
import base_url from "@/components/helper/baseurl";


export async function generateMetadata() {
  try {
    const res = await fetch(`${base_url}/getAllViralStories`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch viral stories");

    const stories = await res.json();

    return {
      title: "Viral Stories - Top5Shots",
      description:
        "Browse all viral stories on Top5Shots. Stay updated with trending stories, videos, and more.",
      alternates: {
        canonical: `https://www.top5shots.com/viralstories`,
      },
      openGraph: {
        title: "Viral Stories - Top5Shots",
        description:
          "Browse all viral stories on Top5Shots. Stay updated with trending stories, videos, and more.",
        url: `https://www.top5shots.com/viralstories`,
        siteName: "Top5Shots",
        type: "website",
        images: stories.length
          ? [
              {
                url:
                  typeof stories[0].image === "string" &&
                  stories[0].image.startsWith("http")
                    ? stories[0].image
                    : stories[0].image || "/images/default-og.jpg",
                alt: stories[0].title || "Viral Story",
                width: 1200,
                height: 630,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: "Viral Stories - Top5Shots",
        description:
          "Browse all viral stories on Top5Shots. Stay updated with trending stories, videos, and more.",
        images: stories.length
          ? [
              typeof stories[0].image === "string" &&
              stories[0].image.startsWith("http")
                ? stories[0].image
                : stories[0].image || "/images/default-og.jpg",
            ]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Viral Stories - Top5Shots",
      description:
        "Browse all viral stories on Top5Shots. Stay updated with trending stories, videos, and more.",
    };
  }
}

export default function ViralStoriesPage() {
  return <ViralStoriesListing />;
}
