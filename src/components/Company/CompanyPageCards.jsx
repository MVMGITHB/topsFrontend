"use client";

import Image from "next/image";
import Link from "next/link";

export default function CompanyCard({ company }) {
  return (
    <Link href={`/company/${company.slug}`}>
      <div className="border rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition bg-white">
        <div className="w-16 h-16 relative">
          <Image
            src={company.logo}
            alt={company.websiteName}
            fill
            className="object-contain rounded-full"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {company.websiteName}
          </h2>
        </div>
      </div>
    </Link>
  );
}
