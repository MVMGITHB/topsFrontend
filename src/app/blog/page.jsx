import BlogListing from "@/components/blog/bloglisting";
import base_url from "@/components/helper/baseurl";
import Head from "next/head";

export async function generateMetadata() {
  try {
    const res = await fetch(`${base_url}/getAllArticle`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch blogs");

    const blogs = await res.json();

    return {
      title: "Latest Blog Posts - Top5Shots",
      description:
        "Explore the latest insights, updates, and articles from Top5Shots. Stay informed with our newest blog posts.",
      alternates: {
        canonical: `https://www.top5shots.com/blog`,
      },
      robots: "index, follow",
      openGraph: {
        title: "Latest Blog Posts - Top5Shots",
        description:
          "Explore the latest insights, updates, and articles from Top5Shots. Stay informed with our newest blog posts.",
        url: `https://www.top5shots.com/blog`,
        siteName: "Top5Shots",
        type: "website",
        images: blogs.length
          ? [
              {
                url:
                  typeof blogs[0].image === "string"
                    ? blogs[0].image.includes("res")
                      ? blogs[0].image
                      : `${base_url}${blogs[0].image}`
                    : blogs[0].image?.url || "/default-og.jpg",
                alt: blogs[0].title,
                width: 1200,
                height: 630,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title: "Latest Blog Posts - Top5Shots",
        description:
          "Explore the latest insights, updates, and articles from Top5Shots. Stay informed with our newest blog posts.",
        images: blogs.length
          ? [
              typeof blogs[0].image === "string"
                ? blogs[0].image.includes("res")
                  ? blogs[0].image
                  : `${base_url}${blogs[0].image}`
                : blogs[0].image?.url || "/default-og.jpg",
            ]
          : [],
      },
    };
  } catch (error) {
    return {
      title: "Blogs - Top5Shots",
      description: "Explore the latest insights and blog posts from Top5Shots.",
      alternates: {
        canonical: `https://www.top5shots.com/blog`,
      },
    };
  }
}

export default function BlogsPage() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.top5shots.com/blog" />
        <meta name="robots" content="index, follow" />
        <meta name="robots" content="index, follow" />
      </Head>
      <BlogListing />
    </>
  );
}
