"use client";

import { useEffect, useState } from "react";
import base_url from "@/components/helper/baseurl";
import CompanyCard from "@/components/Company/CompanyPageCards";

export default function AllCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(`${base_url}/getAllCompany`);
        const data = await res.json();
        setCompanies(data);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading)
    return <p className="text-center py-10">Loading companies...</p>;
  if (!companies || companies.length === 0)
    return <p className="text-center py-10">No companies found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {companies.map((company) => (
        // <CompanyCard key={company.slug} company={company} />
        <CompanyCard key={company.slug || company._id} company={company} />

      ))}
    </div>
  );
}
