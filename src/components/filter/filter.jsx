import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterComponent = () => {
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    { label: "Age", options: ["Show all", "18-24", "25-34", "35-44", "45+"] },
    {
      label: "Monthly Income",
      options: [
        "Show all",
        "< $2,000",
        "$2,000 - $5,000",
        "$5,000 - $10,000",
        "> $10,000",
      ],
    },
    {
      label: "Years into Work",
      options: ["Show all", "< 1 year", "1-3 years", "3-5 years", "5+ years"],
    },
    {
      label: "Looking For",
      options: [
        "Show all",
        "Credit Card",
        "Personal Loan",
        "Business Loan",
        "Health Insurance",
        "Life Insurance",
        "Investment",
      ],
    },
  ];

  return (
    <div className=" items-center justify-between bg-white text-black shadow-md rounded-2xl p-4 sm:p-6 max-w-6xl my-10 border border-gray-200 transition hover:shadow-lg hover:scale-[1.01]">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-center sm:text-left w-full">
          Improve your results for better rates
        </h3>

        {/* Toggle Button - visible only on mobile */}
        <button
          className="sm:hidden flex items-center text-blue-600 font-medium"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
          {showFilters ? (
            <ChevronUp className="ml-1 w-5 h-5" />
          ) : (
            <ChevronDown className="ml-1 w-5 h-5" />
          )}
        </button>
      </div>

      {/* Filters Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ${
          showFilters ? "block" : "hidden"
        } sm:grid`}
      >
        {filters.map((filter, index) => (
          <div
            key={index}
            className="group relative transition-all hover:shadow-xl hover:scale-[1.02] bg-white rounded-xl p-3 border border-gray-200"
          >
            <label className="block text-sm font-semibold mb-2">
              {filter.label}
            </label>
            <div className="relative">
              <select className="appearance-none w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-black outline-none transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 hover:border-blue-400">
                {filter.options.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
