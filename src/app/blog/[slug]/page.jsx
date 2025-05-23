import BlogArticle from "@/components/blog/blogArticle";
import Head from "next/head";
import base_url from "@/components/helper/baseurl";

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Blog not found");
    const blog = await res.json();

    const imageUrl =
      typeof blog.image === "string"
        ? blog.image.includes("res")
          ? blog.image
          : `${base_url}${blog.image}`
        : blog.image?.url || "/default-og.jpg";

    return {
      title: blog.mtitle || blog.title,
      description: blog.mdesc || "Read the latest insights on Top5Shots",
      alternates: {
        canonical: `https://www.top5shots.com/blog/${blog.slug}`,
      },
      robots: "index, follow",
      openGraph: {
        title: blog.mtitle || blog.title,
        description: blog.mdesc || "",
        url: `https://www.top5shots.com/blog/${blog.slug}`,
        siteName: "Top5Shots",
        type: "article",
        images: [
          {
            url: imageUrl,
            alt: blog.title,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.mtitle || blog.title,
        description: blog.mdesc || "",
        images: [imageUrl],
      },
    };
  } catch (err) {
    return {
      title: "Blog not found - Top5Shots",
      description: "The blog you are looking for doesn't exist.",
      robots: "index, follow",
    };
  }
}

export default function BlogArticlePage({ params }) {
  const { slug } = params;

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://www.top5shots.com/blog/${slug}`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <BlogArticle slug={slug} />
    </>
  );
}
