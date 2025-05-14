"use client";
import { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import base_url from "@/components/helper/baseurl";

export default function CompanyDetailPage({ slug }) {
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

  if (loading)
    return (
      <p className="text-center py-10 text-black">Loading company details...</p>
    );
  if (!company)
    return (
      <p className="text-center py-10 text-black">
        No company found for ID "{slug}"
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white text-black">
      <div className="bg-white p-6 rounded-2xl border border-black shadow-md space-y-10 text-black">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={
              typeof company.logo === "string"
                ? company.logo.includes("res")
                  ? company.logo
                  : `${base_url}${company.logo}`
                : company.logo?.url
            }
            alt={company.websiteName}
            className="w-40 h-40 object-contain"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{company.websiteName}</h1>
            <p className="text-xl">{company.mainHeading}</p>
            <div className="mt-3 text-yellow-500 text-lg font-semibold">
              {company.rating} ⭐
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <Section
          title="Benefits Overview"
          isOpen={openSections.benefits}
          onToggle={() => toggleSection("benefits")}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {company.benifits?.map((benefit, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Key Features"
          isOpen={openSections.features}
          onToggle={() => toggleSection("features")}
        >
          <ol className="list-decimal list-inside space-y-1">
            {company.features?.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ol>
        </Section>

        <Section
          title="Description"
          isOpen={openSections.description}
          onToggle={() => toggleSection("description")}
        >
          <p>{company.Description}</p>
        </Section>

        <Section
          title="Expert Review"
          isOpen={openSections.review}
          onToggle={() => toggleSection("review")}
        >
          <p>{company.review}</p>
        </Section>

        <Section
          title="Pros & Cons"
          isOpen={openSections.prosCons}
          onToggle={() => toggleSection("prosCons")}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-white">
                <tr>
                  <th className="text-left p-3 border-b border-gray-300 text-green-600">
                    Pros
                  </th>
                  <th className="text-left p-3 border-b border-gray-300 text-red-600">
                    Cons
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.max(
                    company.pros?.length || 0,
                    company.cons?.length || 0
                  ),
                }).map((_, i) => (
                  <tr key={i} className="border-t border-gray-300">
                    <td className="p-3">{company.pros?.[i] || ""}</td>
                    <td className="p-3">{company.cons?.[i] || ""}</td>
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
        className="flex justify-between items-center w-full text-left text-xl font-semibold text-black mb-2"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isOpen && <div className="pl-1 text-black">{children}</div>}
    </div>
  );
}
