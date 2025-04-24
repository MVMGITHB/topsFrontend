"use client";
import React, { useEffect, useState } from "react";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const NewsPage = () => {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = "59c5ca4183b4437e9c98887afb700ac4"; // Replace with your actual News API key
        const fetchedArticles = {};

        for (const category of categories) {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
          );
          const data = await response.json();

          if (data.status === "ok") {
            fetchedArticles[category] = data.articles.slice(0, 5); // Top 5 articles
          } else {
            fetchedArticles[category] = []; // Handle no data case
          }
        }

        setArticles(fetchedArticles);
      } catch (err) {
        setError("Failed to fetch articles. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Top 5 Viral Stories
      </h1>
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {articles[category]?.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 hover:bg-gray-100 transition-all"
                >
                  <div
                    className="h-48 bg-cover bg-center rounded-t-lg"
                    style={{
                      backgroundImage: `url(${
                        article.urlToImage || "/images/default-image.jpg"
                      })`,
                    }}
                  ></div>
                  <div className="py-4 px-6">
                    <h3 className="text-lg font-semibold text-blue-600">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 mt-2">{article.description}</p>
                    <div className="mt-4 text-indigo-500 font-medium">
                      Read more →
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
