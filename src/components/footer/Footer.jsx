"use client";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const footerNavs = [
    {
      label: "Quick Links",
      items: [
        { href: "/blog", name: "Blog" },
        { href: "/news", name: "News" },
        { href: "/viralstories", name: "Viral Stories" },
        { href: "/matchscore", name: "Match Score" },
      ],
    },
    {
      label: "Company",
      items: [
        { href: "/about-us", name: "About Us" },
        { href: "/contact-us", name: "Contact" },
        { href: "/privacy-policy", name: "Privacy Policy" },
      ],
    },
    {
      label: "Resources",
      items: [
        { href: "/terms", name: "Terms of Service" },
        { href: "/faq", name: "FAQs" },
        { href: "/support", name: "Support" },
        { href: "/advertising", name: "Advertising" },
      ],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("email", email);
    formData.append("access_key", "8d887b6d-94e3-48cf-9455-a85001f477b7"); // ✅ Add this line
  
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const result = await res.json();
      if (result.success) {
        {submitted && (
          <p className="text-green-500 text-sm mt-2">Thanks for subscribing!</p>
        )}
        setSubmitted(true);
        setEmail("");
      } else {
        console.error("Web3Forms error:", result);
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }
  
    setLoading(false);
  };
  
  

  return (
    <footer className="bg-gray-900 text-gray-300 py-5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        {/* Newsletter Section */}
        <div className="md:flex md:items-center md:justify-between border-b border-gray-700 pb-10">
          <div className="max-w-lg">
            <h3 className="text-white text-2xl font-sans">
              Stay Updated with Top5Shots
            </h3>
            <p className="text-gray-400 mt-2 text-sm">
              Subscribe to our newsletter for the latest trending stories and updates.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 md:mt-0 flex items-center gap-3">
          <input type="hidden" name="access_key" value="8d887b6d-94e3-48cf-9455-a85001f477b7" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full md:w-80 px-4 py-2 text-gray-900 bg-white outline-none border border-gray-300 focus:border-purple-500 shadow-sm rounded-lg"
            />
            <button
              type="submit"
              disabled={!email || loading}
              className={`bg-purple-600 text-white px-5 py-2 text-sm font-medium rounded-lg shadow-md hover:bg-purple-500 transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
          {footerNavs.map((nav, idx) => (
            <div key={idx}>
              <h4 className="text-white font-semibold mb-3">{nav.label}</h4>
              <ul className="space-y-2">
                {nav.items.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className="hover:text-gray-400 transition">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
          <p className="text-sm">© 2025 Top5Shots. All rights reserved.</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-5 mt-4 md:mt-0">
            <a href="#" className="flex items-center gap-2 hover:text-gray-400">
              <FaFacebook size={24} /> <span>Facebook</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-400">
              <FaTwitter size={24} /> <span>Twitter</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-400">
              <FaLinkedinIn size={24} /> <span>LinkedIn</span>
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-gray-400">
              <FaInstagram size={24} /> <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
