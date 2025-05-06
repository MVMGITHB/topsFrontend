export default function generateBlogSchema(blog, author) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://top5shots.com/blogs/${blog.slug}`
      },
      "headline": blog.mtitle || blog.title,
      "description": blog.mdesc || blog.body?.slice(0, 160),
      "image": typeof blog.image === "string" ? blog.image : blog.image?.url || "/images/default-banner.png",
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
      "datePublished": new Date(blog.createdAt).toISOString(),
      "dateModified": new Date(blog.updatedAt).toISOString()
    };
  }
  