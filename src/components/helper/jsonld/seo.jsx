"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";

export default function SeoMeta({
  title,
  description,
  baseUrl = "https://top5shots.com",
  image = "https://top5shots.com/default-og.jpg",
  breadcrumbs = [],
}) {
  const pathname = usePathname();

  // Normalize and remove trailing slash
  const normalizedPath = pathname.replace(/\/$/, "");
  const canonicalUrl = `${baseUrl}${normalizedPath}`;

  const breadcrumbSchema =
    breadcrumbs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url.replace(/\/$/, "")}`,
          })),
        }
      : null;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data: Breadcrumbs */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      )}
    </Head>
  );
}
