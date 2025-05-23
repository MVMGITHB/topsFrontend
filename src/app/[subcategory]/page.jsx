// app/[subcategory]/page.jsx
import TopShorts from "@/components/topshots/topshots";
import axios from "axios";
import base_url from "@/components/helper/baseurl";

export async function generateMetadata({ params }) {
  const { subcategory } = params;

  try {
    const res = await axios.get(
      `${base_url}/getSubcategoryMeta/${subcategory}`
    );
    const data = res.data;

    return {
      title: data?.metaTitle || `Top Plans for ${subcategory}`,
      description:
        data?.metaDescription ||
        `Compare and discover the best plans available for ${subcategory}.`,
      canonical: `https://www.top5shots.com/${subcategory}`, // Add this line explicitly
      openGraph: {
        title: data?.metaTitle || `Top Plans for ${subcategory}`,
        description:
          data?.metaDescription ||
          `Compare and discover the best plans available for ${subcategory}.`,
        url: `https://www.top5shots.com/${subcategory}`, // Use full site URL, not base_url (usually API URL)
        type: "website",
        images: [
          {
            url:
              data?.metaImage || "https://top5shots.com/default-og-image.jpg",
            width: 800,
            height: 600,
            alt: `Image representing ${subcategory} plans`,
          },
        ],
      },
      alternates: {
        canonical: `https://www.top5shots.com/${subcategory}`, // keep as well
      },
    };
  } catch (err) {
    console.error("SEO metadata fetch failed:", err);

    return {
      title: `Top Plans for ${subcategory}`,
      description: `Compare and discover the best plans available for ${subcategory}.`,
      canonical: `https://www.top5shots.com/${subcategory}`,
      alternates: {
        canonical: `https://www.top5shots.com/${subcategory}`,
      },
    };
  }
}

const Page = ({ params }) => {
  const { subcategory } = params;

  return (
    <div>
      <TopShorts subcategorySlug={subcategory} />
    </div>
  );
};

export default Page;
