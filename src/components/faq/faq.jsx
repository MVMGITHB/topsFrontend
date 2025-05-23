import React from "react";

export default function FAQ({ data, conclusion }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.map((faq) => ({
      "@type": "Question",
      name: faq.ques,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.ans,
      },
    })),
  };

  if (conclusion) {
    faqSchema.conclusion = {
      "@type": "CreativeWork",
      name: "Conclusion",
      text: conclusion,
    };
  }

  return (
    <div className="mt-10 border-t pt-10 px-6 flex justify-center mb-24">
      <div className="w-full max-w-4xl space-y-10">
        <h2 className="text-4xl font-bold text-center text-gray-900 tracking-tight">
          Frequently Asked Questions
        </h2>

        {data.map((faq) => (
          <div
            key={faq._id}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {faq.ques}
            </h3>
            <p className="text-xl text-gray-700 leading-relaxed">{faq.ans}</p>
          </div>
        ))}

        {conclusion && (
          <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-md border border-indigo-100">
            <h3 className="text-2xl font-bold text-indigo-800 text-center mb-4">
              Conclusion
            </h3>
            <p className="text-xl text-gray-800 leading-relaxed text-center max-w-2xl mx-auto">
              {conclusion}
            </p>
          </div>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </div>
  );
}
