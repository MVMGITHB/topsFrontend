import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";

const TopShorts = () => {
  const [shorts, setShorts] = useState([]);
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchTopShorts = async () => {
      try {
        const res = await fetch(
          "https://api.top5shots.com/api/trending-shorts/getAllTrendnig"
        );
        const data = await res.json();
        console.log("Top Shorts Raw Data:", data);

        if (Array.isArray(data) && data.length > 0) {
          const allCompBlogs = data.flatMap((item) => item.compBlog || []);
          setShorts(allCompBlogs);

          const blogDetails = await Promise.all(
            allCompBlogs.map(async (blog) => {
              const res = await axios.get(
                `${base_url}/getOnecompblogs/${blog.slug}`
              );
              return res.data;
            })
          );

          const blogMap = {};
          blogDetails.forEach((blog) => {
            blogMap[blog.slug] = blog;
          });

          setBlogs(blogMap);
        }
      } catch (err) {
        console.error("Error fetching top shorts:", err);
      }
    };

    fetchTopShorts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">Top Shorts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shorts.map((short) => {
          const blog = blogs[short.slug];
          if (!blog) return null;

          return (
            <div
              key={short.slug}
              className="border rounded-2xl p-6 shadow hover:shadow-lg transition bg-white"
            >
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {blog.mtitle || blog.mdesc}
              </p>
              <a
                href={`/${blog?.subcategories?.slug}/${blog.slug}`}
                className="text-blue-600 mt-3 inline-block hover:underline"
              >
                Read more →
              </a>

              {Array.isArray(blog.faqs) && blog.faqs.length > 0 && (
                <div className="mt-6 border-t pt-4 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    FAQs
                  </h4>
                  {blog.faqs.map((faq) => (
                    <div
                      key={faq._id}
                      className="bg-gray-50 p-3 rounded-md border border-gray-200"
                    >
                      <h5 className="font-medium text-gray-900">{faq.ques}</h5>
                      <p className="text-sm text-gray-700 mt-1">{faq.ans}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopShorts;
