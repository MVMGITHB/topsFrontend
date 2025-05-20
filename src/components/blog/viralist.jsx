"use client";

import React, { useEffect, useState } from "react";

const ViralStoriesListing = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://api.top5shots.com/getAllViralStories",
          { cache: "no-store" }
        );
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setArticles(data);
      } catch (err) {
        setError("Failed to load viral stories. Please try again later.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 font-serif">
        All Viral Stories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {articles.map((article) => (
          <a
            key={article._id}
            href={`/viralstories/${article.slug}`}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border overflow-hidden flex flex-col"
          >
            {article.image?.endsWith(".mp4") ? (
              <video
                className="w-full h-48 object-cover"
                muted
                controls
                playsInline
                crossOrigin="anonymous"
              >
                <source src={article.image} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={article.image || "/images/default-image.jpg"}
                alt={article.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            )}

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow">
                {article.mdesc || "No description available."}
              </p>
              <span className="mt-3 inline-block text-indigo-600 font-medium text-sm">
                Read more →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ViralStoriesListing;
