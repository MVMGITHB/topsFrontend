import ComparisonPage from "@/components/comparison/toppicks";
import EVPopup from "@/components/popup/page";

export async function generateMetadata({ params }) {
  const baseUrl = "https://www.top5shots.com";
  const { subcategory, slug } = params;

  try {
    const res = await fetch(`${baseUrl}/getOnecompblogs/${slug}`, {
      cache: "force-cache",
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType?.includes("application/json")) {
      throw new Error("Invalid JSON response");
    }

    const data = await res.json();

    const imageUrl =
      typeof data?.image === "string"
        ? data.image.includes("res")
          ? data.image
          : `${baseUrl}${data.image}`
        : data?.image?.url || "";

    const title = data?.heading || "Top Comparison Page | Top5Shots";
    const description =
      data?.subHeading ||
      data?.para?.slice(0, 155) ||
      "Compare top companies based on expert reviews, ratings, and features.";
    const canonicalUrl = `${baseUrl}/${subcategory}/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "Top5Shots",
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: title,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Comparison | Top5Shots",
      description: "Compare top-rated platforms side-by-side.",
      alternates: {
        canonical: `${baseUrl}/${subcategory}/${slug}`,
      },
    };
  }
}

const Page = async ({ params }) => {
  const { slug } = params;

  return (
    <div className="text-black">
      <ComparisonPage id={slug} />
      <EVPopup />
    </div>
  );
};

export default Page;
