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
      <p className="text-center py-16 text-gray-600 text-lg font-medium tracking-wide">
        Loading company details...
      </p>
    );
  if (!company)
    return (
      <p className="text-center py-16 text-red-600 text-lg font-semibold tracking-wide">
        No company found for slug "{slug}"
      </p>
    );

  const getLogoUrl = () => {
    if (!company.logo) return "/default-logo.png";
    if (typeof company.logo === "string") {
      return company.logo.includes("res")
        ? company.logo
        : `${base_url}${company.logo}`;
    }
    return company.logo?.url || "/default-logo.png";
  };

  const filteredFeatures = Array.isArray(company.features)
    ? company.features.filter(Boolean)
    : [];
  const filteredBenefits = Array.isArray(company.benifits)
    ? company.benifits.filter(Boolean)
    : [];
  const filteredPros = Array.isArray(company.pros)
    ? company.pros.filter(Boolean)
    : [];
  const filteredCons = Array.isArray(company.cons)
    ? company.cons.filter(Boolean)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-4 bg-white rounded-3xl shadow-lg text-gray-900">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-5">
        <img
          src={getLogoUrl()}
          alt={`${company.websiteName} Logo`}
          className="w-48 h-36 object-contain rounded-xl border border-gray-200 shadow-sm"
          loading="lazy"
        />
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
            {company.websiteName}
          </h1>
          <p className="mt-2 text-xl text-gray-700 font-medium leading-relaxed">
            {company.mainHeading}
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 text-yellow-500 text-lg font-semibold select-none">
            <span className="text-2xl">{company.rating}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Accordion Sections */}
      <Section
        title="Benefits Overview"
        isOpen={openSections.benefits}
        onToggle={() => toggleSection("benefits")}
        emptyMessage="No benefits listed."
      >
        <div className="grid sm:grid-cols-2 gap-5">
          {filteredBenefits.map((benefit, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-green-50 p-5 rounded-lg shadow-sm border border-green-200"
            >
              <CheckCircle className="w-7 h-7 text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-800 text-lg leading-relaxed">{benefit}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Key Features"
        isOpen={openSections.features}
        onToggle={() => toggleSection("features")}
        emptyMessage="No key features available."
      >
        <ol className="list-decimal list-inside space-y-3 text-gray-800 text-lg leading-relaxed">
          {filteredFeatures.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ol>
      </Section>

      <Section
        title="Description"
        isOpen={openSections.description}
        onToggle={() => toggleSection("description")}
        emptyMessage="No description provided."
      >
        <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg tracking-wide">
          {company.Description || "No description available."}
        </p>
      </Section>

      <Section
        title="Expert Review"
        isOpen={openSections.review}
        onToggle={() => toggleSection("review")}
        emptyMessage="No expert review available."
      >
        <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg tracking-wide">
          {company.review || "No review available."}
        </p>
      </Section>

      <Section
        title="Pros & Cons"
        isOpen={openSections.prosCons}
        onToggle={() => toggleSection("prosCons")}
        emptyMessage="No pros and cons listed."
      >
        {filteredPros.length === 0 && filteredCons.length === 0 ? (
          <p className="text-gray-600 italic text-lg">
            No pros or cons available.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
            <table className="min-w-full table-fixed border-collapse text-gray-800">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-5 border-b border-gray-300 text-green-700 text-xl font-semibold">
                    Pros
                  </th>
                  <th className="text-left p-5 border-b border-gray-300 text-red-700 text-xl font-semibold">
                    Cons
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.max(filteredPros.length, filteredCons.length),
                }).map((_, i) => (
                  <tr key={i} className="border-t border-gray-300">
                    <td className="p-5 align-top text-lg leading-relaxed">
                      {filteredPros[i] || (
                        <span className="text-gray-400 select-none">-</span>
                      )}
                    </td>
                    <td className="p-5 align-top text-lg leading-relaxed">
                      {filteredCons[i] || (
                        <span className="text-gray-400 select-none">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      {/* Visit Button */}
      <div className="text-center mt-16">
        <a
          href={company.visitSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white text-xl font-semibold px-10 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
          aria-label={`Visit ${company.websiteName} website`}
        >
          Visit Site →
        </a>
      </div>
    </div>
  );
}

function Section({ title, isOpen, onToggle, children, emptyMessage }) {
  return (
    <section className="mb-10">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left text-2xl font-semibold text-gray-900 mb-4 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
        aria-expanded={isOpen}
        aria-controls={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-7 h-7" />
        ) : (
          <ChevronDown className="w-7 h-7" />
        )}
      </button>
      {isOpen && (
        <div
          id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="pl-2 text-gray-800"
        >
          {children || (
            <p className="italic text-gray-500 mt-3 text-lg">{emptyMessage}</p>
          )}
        </div>
      )}
    </section>
  );
}
