import Link from "next/link";
import React from "react";

export default function NewsCard({ article }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-black dark:text-white mb-2">
          {article.title}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-3">
          {article.description?.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{article.source_id?.toUpperCase()}</span>
          <span>{new Date(article.pubDate).toLocaleDateString()}</span>
        </div>
        <Link
          href={"/article"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
