"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import base_url from "../helper/baseurl";
import FAQ from "../faq/faq";
import { faqData } from "../constants/constants";
import FilterComponent from "../filter/filter";

export default function ComparisonPage({ id }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topPicks, setTopPicks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/getOnecompblogs/${id}`);
      setData(response.data);
      const sorted = [...(response.data?.company || [])].sort(
        (a, b) => b.rating - a.rating
      );
      setTopPicks(sorted.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCompanies = data?.company?.filter((item) =>
    item.websiteName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLabel = (rating) => {
    if (rating >= 9.5) return "Exceptional";
    if (rating >= 9.0) return "Excellent";
    if (rating >= 8.0) return "Very Good";
    return "Good";
  };

  return (
    <div className="bg-white text-black py-14 px-4 sm:px-6 lg:px-8">
      {/* Top 3 Picks */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-600">Last Updated: Apr 2025</p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Our Top 3 Picks
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {topPicks.map((app, i) => (
            <div
              key={i}
              className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition hover:shadow-md hover:scale-[1.02]"
            >
              {i === 0 && (
                <span className="absolute -top-3 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ✅ We Recommend
                </span>
              )}

              <div className="flex items-center justify-between mb-4">
                <img
                  src={app.logo || "/images/placeholder.png"}
                  alt={app.websiteName}
                  className="w-30 h-20 object-contain"
                />
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-black font-semibold text-2xl">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-green-600 size-5"
                    />
                    {app.rating?.toFixed(1)}
                  </div>
                  <div className="text-md font-medium text-gray-600">
                    Our score
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-800 mb-6 text-center">
                {app.features?.[0] || "Trusted by thousands"}
              </p>

              <div className="flex justify-center">
                <a
                  href={app.visitSiteUrl}
                  className="inline-block bg-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
                >
                  Visit Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FilterComponent />

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto">
        {/* Desktop Horizontal Card View */}
        <div className="hidden md:flex flex-col gap-6">
          {filteredCompanies?.map((card, index) => (
            <div
              key={index}
              className="relative flex flex-wrap items-center justify-between border border-gray-200 rounded-2xl shadow p-6 transition hover:shadow-lg hover:scale-[1.01]"
            >
              <div className="absolute top-0 left-0 w-10 h-10 bg-blue-600 rounded-br-full flex items-center justify-center text-white text-sm font-bold shadow-md z-10">
                {index + 1}
              </div>

              <div className="flex items-center gap-4 min-w-[220px]">
                <img
                  src={card.logo}
                  alt={card.websiteName}
                  className="w-24 h-16 object-contain rounded-md"
                />
                {/* <Link
                  href={`/subCatergory/${card.slug}`}
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                > */}
                {/* <Link
                  href={`/company/${card.slug}`}
                  className="text-xl font-semibold text-gray-900 hover:text-blue-600"
                >
                  {card.websiteName}
                </Link> */}
                <Link href={`/company/${card.slug}`}>{card.websiteName}</Link>
              </div>

              <div className="flex flex-col items-center justify-center min-w-[160px] px-4 py-2">
                <span className="text-3xl font-bold text-gray-900 leading-tight">
                  {card.rating.toFixed(1)}
                </span>

                <div className="flex items-center mt-1 mb-1 text-yellow-400 gap-1">
                  {[...Array(Math.floor(card.rating))].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="currentColor"
                      className=" transition-transform duration-200 hover:scale-110"
                    />
                  ))}

                  {card.rating % 1 >= 0.5 && (
                    <StarHalf size={18} fill="currentColor" />
                  )}
                </div>

                <span className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                  Our Rating
                </span>
              </div>

              <ul className="flex-1 mx-6 space-y-2">
                {card.features?.slice(0, 4).map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="text-green-500 mt-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-start justify-center gap-2 min-w-[180px] text-left">
                <span className="ml-7 text-base text-black font-medium">
                  Get Exclusive Offer
                </span>
                <Link
                  href={card.visitSiteUrl}
                  className="ml-10 inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 text-sm"
                >
                  Visit Site →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        {/* Mobile View */}
        <div className="md:hidden space-y-4 mt-6">
          {filteredCompanies?.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md space-y-3 border border-gray-100"
            >
              <div className="flex items-center justify-between gap-4 text-black">
                <div className="flex flex-col">
                  <img
                    src={card.logo}
                    alt={card.websiteName}
                    className="w-32 h-16 object-contain rounded"
                  />
                  <Link
                    href={`/company/${card.slug}`}
                    className="mt-2 text-base font-semibold text-gray-900 hover:text-blue-600"
                  >
                    {card.websiteName}
                  </Link>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-3xl font-bold text-gray-900 leading-tight">
                    {card.rating.toFixed(1)}
                  </span>

                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(Math.floor(card.rating))].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="currentColor"
                        className="transition-transform duration-200 hover:scale-110"
                      />
                    ))}

                    {card.rating % 1 >= 0.5 && (
                      <StarHalf size={18} fill="currentColor" />
                    )}
                  </div>

                  <span className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                    Our Rating
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-700">
                {card.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center justify-center gap-2 mt-4">
                <span className="text-base text-black font-medium text-center">
                  Get Exclusive Offer
                </span>
                <Link
                  href={card.visitSiteUrl}
                  className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 text-sm"
                >
                  Visit Site →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white text-black">
        <FAQ data={faqData} />
      </div>
    </div>
  );
}
