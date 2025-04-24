"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InformationByCategory({ categorySlug = "credit-card" }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch("http://localhost:5000/website-comparison");
        const data = await res.json();

        // ✅ Filter by categorySlug
        const filteredCards = data.filter(
          (card) => card?.category?.slug?.toLowerCase() === categorySlug.toLowerCase()
        );

        setCards(filteredCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [categorySlug]);

  if (loading) return <p className="text-center py-10">Loading cards...</p>;

  if (!cards.length)
    return <p className="text-center py-10">No cards found for "{categorySlug}"</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {cards.map((card) => (
        <div key={card._id} className="border rounded-xl p-6 shadow-sm bg-white mb-6">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th colSpan="2" className="text-center text-xl font-semibold text-black py-4">
                  {card.websiteName}
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Logo + Brand Name */}
              <tr>
                <td className="text-center" colSpan="2">
                  <Image
                    src={card.image?.url}
                    alt={card.websiteName}
                    width={60}
                    height={60}
                    className="rounded-full mx-auto"
                  />
                </td>
              </tr>

              {/* Main Header / Headline */}
              <tr>
                <td colSpan="2" className="text-center text-lg font-semibold text-gray-800 py-2">
                  {card.category?.name}
                </td>
              </tr>

              {/* Key Benefits & Features */}
              <tr>
                <td colSpan="2" className="font-semibold text-gray-700 py-2">
                  <div className="text-sm">Key Benefits & Features</div>
                  <ul className="space-y-1 mt-2 text-sm text-gray-700">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                        <span className="ml-2">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>

              {/* Rating */}
              <tr>
                <td className="text-center text-sm text-yellow-600" colSpan="2">
                  {card.rating} ⭐
                </td>
              </tr>

              {/* Rating Benefits */}
              <tr>
                <td className="text-center">{card.benefit1}</td>
                <td className="text-center">{card.benefit2}</td>
              </tr>
              <tr>
                <td className="text-center">{card.benefit3}</td>
                <td className="text-center">{card.benefit4}</td>
              </tr>

              {/* Key Details & Description */}
              <tr>
                <td colSpan="2" className="font-semibold text-gray-700 py-2">
                  Key Details & Description
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-sm text-gray-600 py-1">
                  {card.description}
                </td>
              </tr>

              {/* Expert Reviews */}
              <tr>
                <td colSpan="2" className="font-semibold text-gray-700 py-2">
                  Expert Reviews
                </td>
              </tr>
              <tr>
                <td colSpan="2" className="text-sm text-gray-600 py-1">
                  {card.expertReview}
                </td>
              </tr>

              {/* Pros & Cons */}
              <tr>
                <td className="text-sm font-semibold text-green-500 py-2">Pros</td>
                <td className="text-sm font-semibold text-red-500 py-2">Cons</td>
              </tr>
              <tr>
                <td className="text-sm text-gray-600">{card.pros}</td>
                <td className="text-sm text-gray-600">{card.cons}</td>
              </tr>

              {/* CTA (Apply Now Button) */}
              <tr>
                <td colSpan="2" className="text-center py-4">
                  <Link
                    href={card.url}
                    target="_blank"
                    className="inline-block bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply Now
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

