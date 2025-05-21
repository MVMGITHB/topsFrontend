// app/[subcategory]/page.jsx
import TopShorts from "@/components/topshots/topshots";

const Page = ({ params }) => {
  const { subcategory } = params; // This catches dynamic slug like 'credit'

  return (
    <div>
      <TopShorts subcategorySlug={subcategory} />
    </div>
  );
};

export default Page;
