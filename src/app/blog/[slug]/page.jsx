import BlogArticle from "@/components/blog/blogArticle";
import base_url from "@/components/helper/baseurl";

export async function generateMetadata({ params }) {
  const slug = await params.slug;

  try {
    const res = await fetch(`${base_url}/blogs/${slug}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Blog not found");
    const blog = await res.json();

    return {
      title: blog.mtitle || blog.title,
      description: blog.mdesc || "Read the latest insights on Top5Shots",
      alternates: {
        // canonical: `https://www.top5shots.com/blogs/${blog.slug}`,
        canonical : "./"
      },
      openGraph: {
        title: blog.mtitle || blog.title,
        description: blog.mdesc || "",
        url: `https://www.top5shots.com/blogs/${blog.slug}`,
        images: [
          {
            url:
              typeof blog.image === "string"
                ? blog.image.includes("res")
                  ? blog.image
                  : `${base_url}${blog.image}`
                : blog.image?.url || "/default-og.jpg",
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.mtitle || blog.title,
        description: blog.mdesc || "",
        images: [
          typeof blog.image === "string"
            ? blog.image.includes("res")
              ? blog.image
              : `${base_url}${blog.image}`
            : blog.image?.url || "/default-og.jpg",
        ],
      },
    };
  } catch (err) {
    return {
      title: "Blog not found - Top5Shots",
      description: "The blog you are looking for doesn't exist.",
    };
  }
}


export default function BlogArticlePage({ params }) {
  const { slug } = params;

  return <BlogArticle slug={slug} />;
}
