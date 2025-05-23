"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Head from "next/head";
import base_url from "../helper/baseurl";

export default function Breadcrumb() {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const name = decodeURIComponent(segment.replace(/-/g, " "));
    const item = `${base_url}/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      "@type": "ListItem",
      position: index + 2,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      item,
    };
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base_url}/`,
      },
      ...breadcrumbItems,
    ],
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <nav
        className="w-full tracking-wide px-4 sm:px-3 mt-2 mb-2 text-md text-gray-600 overflow-x-auto whitespace-nowrap mr-40"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-1 sm:space-x-2">
          <li>
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
          </li>

          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");
            const isLast = index === pathSegments.length - 1;
            const label = decodeURIComponent(segment.replace(/-/g, " "));

            return (
              <li key={index} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                {isLast ? (
                  <span
                    className="text-foreground font-medium capitalize"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
