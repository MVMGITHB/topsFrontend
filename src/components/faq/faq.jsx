import React from "react";

export default function FAQ({ data, conclusion }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="mt-3 border-t pt-6 px-4 flex justify-center mb-20">
      <div className="w-full max-w-8xl space-y-6">
        <h4 className="text-4xl font-semibold text-gray-800 text-center">
          FAQs
        </h4>

        {data.map((faq) => (
          <div
            key={faq._id}
            className="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm"
          >
            <h5 className="font-semibold text-gray-900 text-lg">{faq.ques}</h5>
            <p className="text-sm text-gray-700 mt-1">{faq.ans}</p>
          </div>
        ))}

        {conclusion && (
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl shadow-md border border-indigo-100">
            <h5 className="text-2xl font-semibold text-indigo-800 text-center mb-2">
              Conclusion
            </h5>
            <p className="text-gray-800 text-base leading-relaxed text-center max-w-3xl mx-auto">
              {conclusion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
