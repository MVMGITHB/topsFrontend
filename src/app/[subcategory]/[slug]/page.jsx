import ComparisonPage from "@/components/comparison/toppicks";

const Page = async ({ params }) => {
  const { subcategory, slug } = await params;

  return (
    <div className="text-black">
      <ComparisonPage id={slug} />
    </div>
  );
};

export default Page;
