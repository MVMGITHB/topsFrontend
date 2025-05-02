import { useState } from "react";
import { ChevronDown } from "lucide-react";
const FAQ = ({ data }) => {
  return (
    <div className="bg-white text-black max-w-6xl mx-auto p-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

      {Object.entries(data).map(([category, faqs]) => (
        <div key={category} className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 capitalize">{category}</h3>
          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-base mb-2">{faq.question}</p>
                <p className="text-sm text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
