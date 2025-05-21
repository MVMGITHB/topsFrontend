"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Star, StarHalf } from "lucide-react";
import Link from "next/link";
import base_url from "../helper/baseurl";
import FAQ from "../faq/faq";
import FilterComponent from "../filter/filter";

export default function ComparisonPage({ id }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topPicks, setTopPicks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/getOnecompblogs/${id}`);
      console.log(response.data);
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

  const getRatingLabel = (rating) => {
    if (rating >= 9.5) return "Exceptional";
    if (rating >= 9.0) return "Excellent";
    if (rating >= 8.0) return "Very Good";
    return "Good";
  };

  return (
    <div className="bg-white text-black px-4 sm:px-6 lg:px-8 py-2 ">
      {/* Header */}
      {data.heading && (
        <section className="flex flex-col lg:flex-row items-center justify-evenly bg-[#f7f8fd] rounded-xl p-4  shadow-sm">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-xl sm:text-5xl font-extrabold text-gray-900 mb-4 line-clamp-2">
              {data.heading}
            </h1>
            {data.subHeading && (
              <h2 className="text-lg sm:text-xl text-gray-700 font-medium mb-3">
                {data.subHeading}
              </h2>
            )}
            {data.para && (
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {data.para}
              </p>
            )}
          </div>

          {data.image && (
            <div
              className="flex-shrink-0 mt-6 lg:mt-0 lg:ml-6 w-[300px] h-[200px] object-cover rounded-xl shadow-md bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${
                  typeof data.image === "string"
                    ? data.image.includes("res")
                      ? data.image
                      : `${base_url}${data.image}`
                    : data.image?.url
                }')`,
              }}
            ></div>
          )}
        </section>
      )}

      {/* Top 3 Picks */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="mb-3 mt-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Top 3 Picks by users
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* {console.log(topPicks)} */}
          {topPicks.map((app, i) => (
            <div
              key={i}
              className="relative bg-white border border-gray-200 rounded-xl p-3 shadow-sm transition hover:shadow-md hover:scale-[1.02]"
            >
              {i === 0 && (
                <span className="absolute -top-3 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ✅ We Recommend
                </span>
              )}

              <div className="flex items-center justify-between mb-4">
                <Link href={`/company/${app.slug}`}>
                  <img
                    src={
                      typeof app.logo === "string"
                        ? app.logo.includes("res")
                          ? app.logo
                          : `${base_url}${app.logo}`
                        : app.logo?.url
                    }
                    alt={app.websiteName}
                    className="w-36 h-24 object-contain cursor-pointer"
                  />
                </Link>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-black  text-3xl md:text-3xl font-bold">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-green-600 size-5"
                    />
                    {app.rating?.toFixed(1)}
                  </div>
                  <div className="text-md font-medium text-black">
                    User Rating
                  </div>
                </div>
              </div>

              <ul className="text-md/6 tracking-wide text-black mb-3 text-left list-disc pl-4">
                {app.features?.slice(0, 2).map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>

              <div className="flex justify-center">
                <a
                  href={app.visitSiteUrl}
                  className="inline-block bg-blue-600 text-white text-sm font-semibold px-15 py-2 rounded-md hover:bg-blue-700 transition shadow-md"
                >
                  Visit Site
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <FilterComponent />

      {/* Comparison Table */}
      <section className="max-w-7xl mx-auto mt-10">
        {/* Desktop View */}
        <div className="hidden md:flex flex-col gap-6">
          {filteredCompanies?.map((card, index) => (
            <div
              key={index}
              className="relative flex flex-wrap items-center justify-between gap-4 border rounded-2xl p-6 shadow hover:shadow-lg transition hover:scale-[1.01]"
            >
              <div className="absolute top-0 left-0 rounded-tl-xl  bg-blue-600 px-3 py-1 text-white text-sm font-bold shadow z-10">
                {index + 1}
              </div>

              <div className="flex items-center gap-4 min-w-[220px]">
                <Link href={`/company/${card.slug}`}>
                  <img
                    src={
                      typeof card.logo === "string"
                        ? card.logo.includes("res")
                          ? card.logo
                          : `${base_url}${card.logo}`
                        : card.logo?.url
                    }
                    alt={card.websiteName}
                    className="w-34 h-24 object-contain"
                  />
                </Link>
                {/* <Link
                  href={`/company/${card.slug}`}
                  className=" font-semibold text-xl text-blue-700 hover:underline"
                >
                  {card.websiteName}
                </Link> */}
              </div>
              <div className="flex flex-col items-center w-36">
                <span className="text-3xl md:text-3xl font-bold">
                  {card.rating.toFixed(1)}
                </span>
                <div className="flex items-center text-yellow-400 space-x-0.5 md:space-x-1">
                  {[...Array(Math.floor(card.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 hover:scale-110 hover:text-yellow-300 cursor-pointer"
                      fill="currentColor"
                    />
                  ))}
                  {card.rating % 1 >= 0.5 && (
                    <StarHalf
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 hover:scale-110 hover:text-yellow-300 cursor-pointer"
                      fill="currentColor"
                    />
                  )}
                </div>
                <span className="text-xs md:text-sm font-medium text-black uppercase">
                  User Rating
                </span>
              </div>

              <ul className="flex-1 mx-4 space-y-1 text-md tracking-wide text-black">
                {card.features?.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">
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
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col min-w-[180px] gap-2 text-left">
                <span className="text-md font-semibold">
                  Get Exclusive Offer
                </span>
                <Link
                  href={card.visitSiteUrl}
                  className="inline-flex bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                >
                  Visit Site →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-6 mt-6">
          {filteredCompanies?.map((card, index) => (
            <div
              key={index}
              className="relative border rounded-2xl p-4 shadow hover:shadow-lg transition hover:scale-[1.01] bg-white"
            >
              {/* Rank Badge */}
              <div className="absolute top-0 left-0 rounded-tl-xl bg-blue-600 px-3 py-1 text-white text-sm font-bold shadow z-10">
                {index + 1}
              </div>

              {/* Header Row: Logo - Website Name - Rating */}
              <div className="flex items-center justify-between mb-4">
                <Link href={`/company/${card.slug}`}>
                  <img
                    src={
                      typeof card.logo === "string"
                        ? card.logo.includes("res")
                          ? card.logo
                          : `${base_url}${card.logo}`
                        : card.logo?.url
                    }
                    alt={card.websiteName}
                    className="w-36 h-24 object-contain"
                  />
                </Link>
                {/* <Link
                  href={`/company/${card.slug}`}
                  className="text-lg font-semibold text-blue-700 hover:underline flex-1 text-center px-2"
                >
                  {card.websiteName}
                </Link> */}

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-black font-semibold text-2xl">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-yellow-400"
                    />
                    {card.rating.toFixed(1)}
                  </div>
                  <div className="text-md font-medium ml-2 text-black">
                    User Rating
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="text-sm text-black font-medium space-y-2 mb-4">
                {card.features?.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500">
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

              {/* CTA Button */}
              <div className="text-center">
                <p className="text-md font-semibold mb-2">
                  Get Exclusive Offer
                </p>
                <Link
                  href={card.visitSiteUrl}
                  className="inline-block bg-blue-600 text-white px-10 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Visit Site →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      {Array.isArray(data.faqs) && data.faqs.length > 0 && (
        <div className="mt-8 mb-10">
          <FAQ data={data.faqs} />
        </div>
      )}
    </div>
  );
}
