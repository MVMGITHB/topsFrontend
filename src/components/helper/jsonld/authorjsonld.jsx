"use client";

import base_url from "@/components/helper/baseurl";

export default function AuthorJsonLd({ author }) {
  if (!author) return null;

  // Construct full image URL if relative path given
  let imageUrl = author.image || "/images/default-user.png";
  if (imageUrl && !imageUrl.startsWith("http")) {
    imageUrl = `${base_url}${imageUrl}`;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://top5shots.com/author/${author.username}`,
    name: `${author.firstName} ${author.lastName}`,
    url: `https://top5shots.com/author/${author.username}`,
    image: imageUrl,
    jobTitle: author.role || "Contributor",
    description: author.shortBio || "",
    sameAs: [author.twitter, author.linkedin, author.website].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
