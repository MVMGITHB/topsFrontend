"use client";

import React, { useEffect, useState } from "react";

const ExamResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const simulatedData = [
        {
          exam: "NEET UG 2025",
          date: "May 4, 2025",
          resultDate: "June 14, 2025",
          link: "https://neet.nta.nic.in/",
        },
        {
          exam: "CBSE Class 12 Board Exams 2025",
          date: "Feb 15 - Apr 4, 2025",
          resultDate: "Expected by May 20, 2025",
          link: "https://results.cbse.nic.in/",
        },
        {
          exam: "UPSC Civil Services Prelims 2025",
          date: "June 2, 2025",
          resultDate: "Expected by July 2025",
          link: "https://upsc.gov.in/",
        },
        {
          exam: "SSC CGL Tier-I 2025",
          date: "July 2025",
          resultDate: "Expected by September 2025",
          link: "https://ssc.nic.in/",
        },
        {
          exam: "State Board Exams 2025",
          date: "March - April 2025",
          resultDate: "Varies by state",
          link: "https://www.education.gov.in/en/state-education-boards",
        },
      ];
      setResults(simulatedData);
    };

    fetchResults();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        🏆 Latest Exam Results - India 2025
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Exam
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Exam Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Result Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Official Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {result.exam}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {result.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {result.resultDate}
                </td>
                <td className="px-6 py-4 text-sm">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                  >
                    View Result →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamResults;
