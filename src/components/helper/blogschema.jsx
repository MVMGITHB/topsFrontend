import base_url from "@/components/helper/baseurl";

export default function generateBlogSchema(blog, author) {
  let imageUrl = "/images/default-banner.png";

  if (typeof blog.image === "string") {
    if (blog.image.startsWith("http://") || blog.image.startsWith("https://")) {
      imageUrl = blog.image;
    } else {
      imageUrl = `${base_url}${blog.image}`;
    }
  } else if (typeof blog.image === "object" && blog.image?.url) {
    if (
      blog.image.url.startsWith("http://") ||
      blog.image.url.startsWith("https://")
    ) {
      imageUrl = blog.image.url;
    } else {
      imageUrl = `${base_url}${blog.image.url}`;
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://top5shots.com/blogs/${blog.slug}`
    },
    "headline": blog.mtitle || blog.title,
    "description": blog.mdesc || blog.body?.slice(0, 160),
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": author?.username || "Top5Shots Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Top5Shots",
      "logo": {
        "@type": "ImageObject",
        "url": "https://top5shots.com/logo.png"
      }
    },
    "datePublished": blog.createdAt ? new Date(blog.createdAt).toISOString() : undefined,
    "dateModified": blog.updatedAt ? new Date(blog.updatedAt).toISOString() : undefined
  };
}
