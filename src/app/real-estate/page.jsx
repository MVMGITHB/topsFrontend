import { Subcategory } from "@/components/finance/Subcategory";

const category = "real-estate";
// Metadata function
export async function generateMetadata() {
  const url = `https://www.top5shots.com/${category}`;

  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Top5Shots`,
    description: `Browse the best of ${category} with Top5Shots – rankings, guides, and insights.`,
    alternates: {
      canonical: url, // ✅ Full canonical URL
    },
    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Top5Shots`,
      description: `Top picks and reviews in the ${category} category.`,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} - Top5Shots`,
      description: `Top picks and reviews in the ${category} category.`,
    },
  };
}

const Page = () => {
  return <Subcategory category={category} />;
};

export default Page;
