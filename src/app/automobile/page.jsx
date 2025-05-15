import { Subcategory } from "@/components/finance/Subcategory";
import axios from "axios";

import base_url from "@/components/helper/baseurl";
const category = "automobile";
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

const page = async () => {
  try {
    const response = await axios.get(`${base_url}/filter/${category}`);
    const data = response.data;

    return (
      <>
        <Subcategory category={category} data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }
};

export default page;
