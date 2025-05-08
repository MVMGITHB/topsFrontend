"use client";

import React from "react";

export default function AuthorJsonLd({ author }) {
  if (!author) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${author.firstName} ${author.lastName}`,
    url: `https://top5shots.com/author/${author.username}`,
    image: author.image || "https://top5shots.com/images/default-user.png",
    jobTitle: author.role || "Contributor",
    description: author.shortBio || "",
    sameAs: [
      author.twitter || "",
      author.linkedin || "",
      author.website || "",
    ].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
