"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function EVPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/car/top5-ev-cars") {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70 p-4 sm:p-6 min-h-screen ">
        <div className="relative w-full max-w-xl sm:max-w-2xl rounded-lg overflow-auto bg-white shadow-lg max-h-[90vh]">
          <button
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute top-3 right-3 text-gray-700 text-3xl font-bold hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
          >
            &times;
          </button>
          <a
            href="https://ev.tatamotors.com/curvv/ev.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image
              src="/images/curvev.png"
              alt="Curvv EV Ad"
              width={872}
              height={389}
              className="w-full h-auto object-cover"
              priority
            />
          </a>
        </div>
      </div>
    )
  );
}
