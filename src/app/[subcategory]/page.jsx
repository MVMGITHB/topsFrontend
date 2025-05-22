// app/[subcategory]/page.jsx
import TopShorts from "@/components/topshots/topshots";

const  Page = ({ params }) => {
  const { subcategory } = params; 

  return (
    <div>
      <TopShorts subcategorySlug={subcategory} />
    </div>
  );
};

export default Page;
