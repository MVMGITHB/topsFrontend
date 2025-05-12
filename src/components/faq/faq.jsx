// faq.js
import React from "react";

export default function FAQ({ data }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="mt-6 border-t pt-4 space-y-4">
      <h4 className="text-lg font-semibold text-gray-800">FAQs</h4>
      {data.map((faq) => (
        <div
          key={faq._id}
          className="bg-gray-50 p-3 rounded-md border border-gray-200"
        >
          <h5 className="font-medium text-gray-900">{faq.ques}</h5>
          <p className="text-sm text-gray-700 mt-1">{faq.ans}</p>
        </div>
      ))}
    </div>
  );
}
