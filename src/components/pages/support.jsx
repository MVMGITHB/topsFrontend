'use client';

import React from 'react';
import Head from 'next/head';

export default function SupportContent() {
  return (
    <>
      <Head>
        <title>Support - Top5Shots</title>
        <meta
          name="description"
          content="Need help? Contact our support team at Top5Shots for assistance. Browse FAQs or send us a message directly for faster help."
        />
        <meta name="keywords" content="Support, Top5Shots, help, contact, FAQs, customer service" />
        <meta property="og:title" content="Support - Top5Shots" />
        <meta
          property="og:description"
          content="Reach out to our support team or explore FAQs on Top5Shots."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/path-to-your-image.jpg" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Support - Top5Shots</h1>
        <p className="text-center text-gray-700 mb-10">
          Need help? We're here for you. Check our FAQ or reach out directly.
        </p>

        {/* Contact Info */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg mb-10">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Contact Us</h2>
          <p className="text-gray-800">
            📧 Email:{' '}
            <a href="mailto:support@top5shots.com" className="text-blue-600 hover:underline">
              support@top5shots.com
            </a>
          </p>
          <p className="text-gray-800">
            📞 Phone:{' '}
            <a href="tel:+1234567890" className="text-blue-600 hover:underline">
              +1 234 567 890
            </a>
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">❓ How do I submit my blog to Top5Shots?</h3>
              <p className="text-sm text-gray-600">
                Use the "Submit Blog" option in the navigation or contact us via email.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">❓ Can I edit my blog after publishing?</h3>
              <p className="text-sm text-gray-600">
                Yes, if you're an admin or contributor, go to your dashboard and click "Edit."
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">❓ Where can I find trending blogs?</h3>
              <p className="text-sm text-gray-600">
                Check out the homepage carousel or explore categories for the latest hot picks.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
