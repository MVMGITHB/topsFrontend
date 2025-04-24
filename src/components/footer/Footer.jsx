"use client";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const footerNavs = [
    {
      label: "Quick Links",
      items: [
        { href: "/home", name: "Home" },
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
              Subscribe to our newsletter for the latest trending stories and
              updates.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 md:mt-0 flex items-center gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full md:w-80 px-4 py-2 text-gray-900 bg-white outline-none border border-gray-300 focus:border-purple-500 shadow-sm rounded-lg"
            />
            <button className="bg-purple-600 text-white px-5 py-2 text-sm font-medium rounded-lg shadow-md hover:bg-purple-500 transition">
              Subscribe
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
                    <a
                      href={item.href}
                      className="hover:text-gray-400 transition"
                    >
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
