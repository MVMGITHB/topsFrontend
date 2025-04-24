"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import base_url from "@/components/helper/baseurl";

export default function CompanyDetailPage({slug}) {
  // const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({
    benefits: true,
    features: true,
    description: true,
    review: true,
    prosCons: true,
  });

  useEffect(() => {
    if (!slug) return;

    const fetchCompany = async () => {
      try {
        const res = await fetch(`${base_url}/getCompanyByslug/${slug}`);
        const data = await res.json();
        console.log(data);
        setCompany(data);
      } catch (error) {
        console.error("Failed to fetch company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [slug]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (loading) return <p className="text-center py-10">Loading company details...</p>;
  if (!company) return <p className="text-center py-10">No company found for ID "{slug}"</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg space-y-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={company.logo}
            alt={company.websiteName}
            className="w-40 h-40 object-contain"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{company.websiteName}</h1>
            <p className="text-xl text-gray-700 dark:text-gray-300">{company.mainHeading}</p>
            <div className="mt-3 text-yellow-500 text-lg font-semibold">
              {company.rating} ⭐
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        {/* Benefits */}
        <Section title="Benefits Overview" isOpen={openSections.benefits} onToggle={() => toggleSection("benefits")}>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
            {company.benifits?.map((benefit, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Features */}
        <Section title="Key Features" isOpen={openSections.features} onToggle={() => toggleSection("features")}>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
            {company.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ol>
        </Section>

        {/* Description */}
        <Section title="Description" isOpen={openSections.description} onToggle={() => toggleSection("description")}>
          <p className="text-gray-700 dark:text-gray-300">{company.Description}</p>
        </Section>

        {/* Expert Review */}
        <Section title="Expert Review" isOpen={openSections.review} onToggle={() => toggleSection("review")}>
          <p className="text-gray-700 dark:text-gray-300">{company.review}</p>
        </Section>

        {/* Pros and Cons Table */}
        <Section title="Pros & Cons" isOpen={openSections.prosCons} onToggle={() => toggleSection("prosCons")}>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="text-left p-3 border-b dark:border-gray-700 text-green-600">Pros</th>
                  <th className="text-left p-3 border-b dark:border-gray-700 text-red-600">Cons</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(company.pros?.length || 0, company.cons?.length || 0) }).map((_, i) => (
                  <tr key={i} className="border-t dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {company.pros?.[i] || ""}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {company.cons?.[i] || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Visit Button */}
        <div className="text-center mt-8">
          <a
            href={company.visitSiteUrl}
            target="_blank"
            className="inline-block bg-blue-600 text-white text-md font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Visit Site
          </a>
        </div>
      </div>
    </div>
  );
}

// Reusable Accordion Section Component
function Section({ title, isOpen, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left text-xl font-semibold text-gray-800 dark:text-white mb-2"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && <div className="pl-1">{children}</div>}
    </div>
  );
}
