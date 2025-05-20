import PrivacyPolicy from "@/components/pages/privacypolicy";

// Dynamic metadata for SEO
export async function generateMetadata() {
  const baseUrl = "https://top5shots.com";

  return {
    title: "Privacy Policy | Top5Shots",
    description:
      "Read the Privacy Policy of Top5Shots to understand how we collect, use, and protect your personal information. Learn about your rights and data protection measures.",
    keywords: [
      "Privacy Policy",
      "data protection",
      "personal information",
      "Top5Shots",
      "security",
      "user rights",
    ],
    alternates: {
      canonical: `${baseUrl}/privacy-policy`,
    },
    openGraph: {
      title: "Privacy Policy | Top5Shots",
      description:
        "Top5Shots explains how we handle your data, your rights, and the measures we take to protect your information.",
      url: `${baseUrl}/privacy-policy`,
      siteName: "Top5Shots",
      images: [
        {
          url: `${baseUrl}/images/privacy-policy-cover.jpg`, // Update path to actual image
          width: 1200,
          height: 630,
          alt: "Privacy Policy - Top5Shots",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Privacy Policy | Top5Shots",
      description:
        "Understand how Top5Shots handles and protects your data with our comprehensive privacy policy.",
      images: [`${baseUrl}/images/privacy-policy-cover.jpg`], // Same image for Twitter
    },
  };
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
