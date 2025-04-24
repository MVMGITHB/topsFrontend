/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cardmaven.in",
      "www.icicibank.com",
      "www.axisbank.com",
      "hdfcbank.com",
      "s3.amazonaws.com",
      "encrypted-tbn0.gstatic.com",
      "res.cloudinary.com",
    ],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml.js",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sitemap.xml", // or any other path
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, follow",
          },
        ],
      },
      {
        source: "/secret-page", // example for another route
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
