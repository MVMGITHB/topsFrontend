"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav
      className="w-full px-4 sm:px-6 md:px-12 mt-2 mb-2 text-sm text-gray-600 overflow-x-auto whitespace-nowrap"
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
  );
}
