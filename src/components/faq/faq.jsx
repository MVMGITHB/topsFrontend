import React from "react";

export default function FAQ({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="mt-3 border-t pt-6 px-4 flex justify-center mb-20">
      <div className="w-full max-w-8xl space-y-4">
        <h4 className="text-4xl font-semibold text-gray-800 text-center">
          FAQs
        </h4>
        {data.map((faq) => (
          <div
            key={faq._id}
            className="bg-gray-50 p-3 rounded-md border border-gray-200"
          >
            <h5 className="font-semibold  text-gray-900">{faq.ques}</h5>
            <p className="text-medium text-sm text-gray-700 mt-1">{faq.ans}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
