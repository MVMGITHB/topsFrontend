"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the Privacy Policy and Terms of Use before submitting.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        e.target.reset();
        setAgreed(false);
      } else {
        console.error("Web3Forms error:", result);
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <hr className="border-gray-300" />
      <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            <h4 className="text-gray-500 font-semibold">Contact us</h4>
            <h2 className="text-4xl font-bold">Get in touch</h2>
            <p className="text-gray-600">
              We'd love to hear from you. Fill out the form and our team will get back to you shortly.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <span>📧</span>
                <span>contact@mvmbs.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>📍</span>
                <span>I Thum I.T. Park, Sector 62 Noida, Uttar Pradesh</span>
              </div>
            </div>

            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0784869880545!2d77.36979007536928!3d28.627409684313502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce569b7660581%3A0xc967ef0b896097d5!2sMVM%20Business%20Services!5e0!3m2!1sen!2sin!4v1745561694261!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Side - Form */}
          <form className="space-y-6 bg-gray-100 p-8 rounded-lg shadow" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="8d887b6d-94e3-48cf-9455-a85001f477b7" />

            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className="w-full p-3 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                name="company"
                type="text"
                id="company"
                placeholder="Company Name"
                className="w-full p-3 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  required
                  className="w-full p-3 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="w-full">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                placeholder="Type your message..."
                className="w-full p-3 bg-white text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black resize-none"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="mt-1 mr-2"
              />
              <label htmlFor="checkbox" className="text-sm text-gray-600">
                By submitting, I agree to the{" "}
                <Link href="/privacy-policy" className="underline font-semibold">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms-of-use" className="underline font-semibold">
                  Terms of Use
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreed || loading}
              className={`w-full py-3 font-semibold rounded transition ${
                agreed ? "bg-black text-white hover:bg-gray-800" : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
