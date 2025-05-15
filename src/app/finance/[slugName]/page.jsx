import ComparisonPage from "@/components/comparison/toppicks";


const page = async ({ params }) => {
  const { slugName } = await params;

  
  return (
    <div className=" text-black">
      <ComparisonPage id={slugName} />
    </div>
  );
};
export default page;
