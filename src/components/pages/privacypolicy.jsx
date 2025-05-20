"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="mb-4">
        At <span className="font-semibold">Top5Shots</span>, we respect your
        privacy and are committed to protecting your personal information. This
        Privacy Policy explains how we collect, use, and safeguard your data
        when you visit our website or use our services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We may collect personal information such as your name, email address,
        and usage data when you:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Sign up or log in to our platform</li>
        <li>Contact us for support</li>
        <li>Browse or interact with our site</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">Your information is used to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Provide and improve our services</li>
        <li>Respond to inquiries and offer support</li>
        <li>Send occasional updates or marketing emails (if you opt-in)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Data Protection</h2>
      <p className="mb-4">
        We implement appropriate security measures to protect your personal data
        from unauthorized access, alteration, or disclosure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        4. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell or rent your personal information. We may share it with
        third-party services that help us operate our platform, only when
        necessary.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal
        information. Contact us if you wish to make changes or request deletion.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        6. Changes to This Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with the updated effective date.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:contact@top5shots.com"
          className="text-blue-600 hover:underline"
        >
          contact@top5shots.com
        </a>
        .
      </p>
    </div>
  );
}
