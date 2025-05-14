"use client";
import { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";

const categories = [
  "Automobile",
  "Ecommerce",
  "Education",
  "Fashion and lifestyle",
  "Finance",
  "Gaming",
  "Real Estate",
  "Sports",
  "Travel",
];

const offers = [
  "Shopping Offers",
  "Personal Loan Offer",
  "Business Loans",
  "Gaming Offers",
  "Offers on Electronics",
  "Travel Offers",
  "Credit Card",
  "Event Tickets",
  "Free Voucher",
];

export default function SurveyPopup2() {
  const [visible, setVisible] = useState(false);
  const [showClose, setShowClose] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOffers, setSelectedOffers] = useState([]);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10000);
    const closeTimer = setTimeout(() => setShowClose(true), 13000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  useEffect(() => {
    if (step === 0 && email && phone) {
      const timer = setTimeout(() => setStep(1), 800);
      return () => clearTimeout(timer);
    }
  }, [email, phone, step]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleOfferToggle = (offer) => {
    setSelectedOffers((prev) =>
      prev.includes(offer)
        ? prev.filter((item) => item !== offer)
        : [...prev, offer]
    );
  };

  const handleSubmit = () => {
    console.log("Email:", email);
    console.log("Phone:", phone);
    console.log("Categories:", selectedCategories);
    console.log("Offers:", selectedOffers);
    setVisible(false);
    // Optional: send to API or save in localStorage
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-fadeIn border border-gray-200">
        {showClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            onClick={() => setVisible(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {step > 0 && (
          <button
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition"
            onClick={() => setStep(step - 1)}
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        <div className="text-center space-y-6">
          {step === 0 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900">
                🎉 Join the Tops Club
              </h2>
              <p className="text-gray-600 text-sm">
                Unlock exclusive offers and latest updates
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your Phone Number"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold text-gray-900">
                📚 Select Your Categories
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Pick at least 3 interests
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium transition duration-200 ${
                      selectedCategories.includes(cat)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white border-gray-300 text-gray-800 hover:bg-blue-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={selectedCategories.length < 3}
                className={`mt-4 w-full py-2 rounded-xl font-semibold transition ${
                  selectedCategories.length >= 3
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold text-gray-900">
                🎯 Choose Your Offers
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Pick what you care about
              </p>
              <div className="grid grid-cols-2 gap-2">
                {offers.map((offer) => (
                  <button
                    key={offer}
                    onClick={() => handleOfferToggle(offer)}
                    className={`py-2 px-3 rounded-xl border text-sm font-medium transition duration-200 ${
                      selectedOffers.includes(offer)
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white border-gray-300 text-gray-800 hover:bg-green-50"
                    }`}
                  >
                    {offer}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                Submit & Join 🎉
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
