"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Search, Star } from "lucide-react";
import Link from "next/link";
import base_url from "../helper/baseurl";

export default function ComparisonPage({ id }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topPicks, setTopPicks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/getOnecompblogs/${id}`);
      setData(response.data);
      const sorted = [...(response.data?.company || [])].sort((a, b) => b.rating - a.rating);
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
    <div className="bg-white dark:bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      {/* Top 3 Picks */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: Apr 2025</p>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Our Top 3 Picks
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {topPicks.map((app, i) => (
            <div
              key={i}
              className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl transition hover:scale-105"
            >
              {i === 0 && (
                <span className="absolute -top-3 left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ✅ We Recommend
                </span>
              )}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={app.logo || "/images/placeholder.png"}
                  alt={app.websiteName}
                  className="w-14 h-14 object-contain rounded-md"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {app.websiteName}
                </h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {getLabel(app.rating)}
                </span>
                <div className="flex items-center text-yellow-500">
                  {[...Array(Math.floor(app.rating))].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-white text-xs font-semibold px-2 py-1 rounded">
                  {app.rating?.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {app.features?.[0] || "Trusted by thousands"}
              </p>
              <a
                href={app.visitSiteUrl}
                className="inline-block mt-auto text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Visit Site →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute top-2.5 left-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300 shadow-md rounded-xl overflow-hidden">
            <thead className="text-xs uppercase bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Features</th>
                <th className="px-6 py-3">Rating</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies?.map((card, index) => (
                <tr
                  key={index}
                  className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={card?.logo}
                        alt={card?.websiteName}
                        className="w-12 h-12 object-contain rounded"
                      />
                      <Link
                        href={`/company/${card.slug}`}
                        className="text-base font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {card?.websiteName}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside text-sm">
                      {card?.features?.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      {[...Array(Math.floor(card?.rating))].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                      <span className="ml-1 text-gray-800 dark:text-white">
                        {card?.rating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={card.visitSiteUrl}
                      className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm font-semibold px-4 py-2 rounded-lg shadow"
                    >
                      Visit Site
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 mt-6">
          {filteredCompanies?.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md space-y-3"
            >
              <div className="flex items-center gap-3">
                <img src={card.logo} alt={card.websiteName} className="w-12 h-12 object-contain rounded" />
                <Link
                  href={`/company/${card.slug}`} 
                  className="text-base font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {card.websiteName}
                </Link>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-200">
                {card.features?.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {[...Array(Math.floor(card.rating))].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="ml-1 text-gray-800 dark:text-white">
                    {card.rating.toFixed(1)}
                  </span>
                </div>
                <Link
                  href={card.visitSiteUrl}
                  className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-sm font-semibold px-4 py-2 rounded-lg shadow"
                >
                  Visit Site
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}