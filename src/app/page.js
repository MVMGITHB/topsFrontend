import Home from "@/components/home/Home";
import SurveyPopup from "@/components/popupsurvey/popupsurvey";
import BackgroundBeamwithCollision from "@/components/ui/BackgroundBeamwithCollision"
export const metadata = {
  title: "Top 5 Shots - Latest Trends, Reviews & Insights",
  description:
    "Explore the top 5 trends, reviews, and insights across various industries. Stay updated with Top5Shots.",
  metadataBase: new URL("https://top5shots.com"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Top 5 Shots",
    description: "Your go-to platform for top 5 trends and insights.",
    url: "https://top5shots.com",
    type: "website",
    images: [
      {
        url: "https://top5shots.com/images/logo.png",
        width: 500,
        height: 200,
        alt: "Top 5 Shots Logo",
      },
    ],
  },

  other: {
    language: "en",
    "geo.region": "US",
    "geo.placename": "United States",
    robots: "index, follow",
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Top5Shots",
      url: "https://top5shots.com",
      logo: "https://top5shots.com/images/logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@top5shots.com",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    }),
  },
};

export default function Home1() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Top5Shots",
    url: "https://top5shots.com",
    logo: "https://top5shots.com/images/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contact@top5shots.com",
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://top5shots.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "News",
        item: "https://top5shots.com/news",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Viral Stories",
        item: "https://top5shots.com/viralstories",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Results",
        item: "https://top5shots.com/results",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Match Score",
        item: "https://top5shots.com/matchscore",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Contest",
        item: "https://top5shots.com/contest",
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
     <SurveyPopup/>
      <Home/>
      
    </div>
  );
}
