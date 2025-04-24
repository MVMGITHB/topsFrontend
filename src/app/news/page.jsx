"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../../components/news/newscard"; // adjust path as needed

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_79089eb5cd5a7b8bf84ce3252bd121ab65cf9&q=top%205%20news%20in%20every%20category  `
        );
        console.log(res)
        setArticles(res.data.results || []);
      } catch (err) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-gray-600 dark:text-gray-300">
        Loading news...
      </div>
    );
  if (error)
    return <div className="p-6 text-red-600 dark:text-red-400">{error}</div>;

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
        Latest Tech News
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}
