"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function EVPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show on the target page
    if (pathname === "/car/top5-ev-cars") {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
        <div className="relative max-w-3xl w-full">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-500 z-10"
          >
            &times;
          </button>
          <a
            href="https://ev.tatamotors.com/curvv/ev.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/curvev.png"
              alt="Curvv EV Ad"
              width={1024}
              height={512}
              className="rounded-lg"
            />
          </a>
        </div>
      </div>
    )
  );
}
