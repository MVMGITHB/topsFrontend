"use client";

import Image from "next/image";
import Link from "next/link";
import base_url from "@/components/helper/baseurl";

export default function CompanyCard({ company }) {
  const getLogoUrl = () => {
    if (!company.logo) return "/default-logo.png";
    if (typeof company.logo === "string") {
      return company.logo.includes("res")
        ? company.logo
        : `${base_url}${company.logo}`;
    }
    return company.logo?.url || "/default-logo.png";
  };

  return (
    <Link
      href={`/company/${company.slug}`}
      className="
        group
        border
        border-gray-200
        rounded-xl
        shadow-sm
        p-5
        flex
        flex-col
        items-center
        text-center
        gap-4
        bg-white
        transition
        hover:shadow-lg
        hover:border-blue-400
        focus-visible:outline-2
        focus-visible:outline-blue-500
        cursor-pointer
      "
      aria-label={`View details for ${company.websiteName}`}
    >
      <div className="w-20 h-20 relative rounded-full overflow-hidden border border-gray-300 bg-gray-50">
        <Image
          src={getLogoUrl()}
          alt={`${company.websiteName} logo`}
          fill
          className="object-contain"
          sizes="80px"
          priority={true}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {company.websiteName}
        </h2>
        {company.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-3">
            {company.description}
          </p>
        )}
      </div>
    </Link>
  );
}
