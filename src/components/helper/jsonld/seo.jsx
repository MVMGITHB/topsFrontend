// components/SEO/SeoMeta.tsx
"use client";

import { usePathname } from "next/navigation";
import Head from "next/head";

export default function SeoMeta({
  title,
  description,
  baseUrl = "https://top5shots.com",
  breadcrumbs = [],
}) {
  const pathname = usePathname();
  const canonicalUrl = `${baseUrl}${pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {breadcrumbs.length > 0 && (
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
