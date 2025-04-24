import React from "react";

// Dynamic metadata
export async function generateMetadata() {
  return {
    title: "Advertise with Us | Top5Shots",
    description:
      "Advertise your brand to a highly engaged audience on Top5Shots. Explore our affordable options including banner ads, sponsored content, and newsletter placements.",
    openGraph: {
      title: "Advertise with Us | Top5Shots",
      description:
        "Get your brand in front of thousands of engaged readers daily with banner ads, sponsored content, and more.",
      url: "https://top5shots.com/advertising",
      siteName: "Top5Shots",
      images: [
        {
          url: "/images/top5shots-advertise.png",
          width: 1200,
          height: 630,
          alt: "Advertise on Top5Shots",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Advertise with Us | Top5Shots",
      description:
        "Affordable advertising options to reach tech-savvy, trend-aware readers. Partner with Top5Shots today.",
      images: ["/images/top5shots-advertise.png"],
    },
  };
}

export default function AdvertisingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Advertise with Top5Shots
      </h1>

      <p className="text-center text-gray-700 mb-8">
        Get your brand in front of thousands of readers every day.
      </p>

      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-black">Why Advertise With Us?</h2>
        <ul className="list-disc pl-5">
          <li>High-quality traffic from engaged readers</li>
          <li>Multiple ad formats: banners, sponsored posts, and newsletters</li>
          <li>Affordable, transparent pricing</li>
        </ul>

        <h2 className="text-xl font-semibold text-black">Available Advertising Options</h2>
        <ul className="list-disc pl-5">
          <li><strong>Banner Ads:</strong> Homepage and blog post placements</li>
          <li><strong>Sponsored Blogs:</strong> Feature your brand in curated posts</li>
          <li><strong>Newsletter Placement:</strong> Promote directly to inboxes</li>
        </ul>

        <h2 className="text-xl font-semibold text-black">Start Advertising</h2>
        <p>
          Interested in advertising? Let’s talk! Email us at{" "}
          <a href="mailto:ads@top5shots.com" className="text-blue-600 underline">
            ads@top5shots.com
          </a>{" "}
          or fill out our <a href="/support" className="text-blue-600 underline">Support Form</a>.
        </p>
      </div>
    </div>
  );
}
