// app/company/[slug]/page.jsx

import CompanyDetailPage from "@/components/Company/CompanyDetailPage";

const Page = ({ params }) => {
  const { slug } = params;

  

  return (
    <div>
      <CompanyDetailPage slug={slug} />
    </div>
  );
};

export default Page;
