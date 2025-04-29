"use client";

import { useEffect, useRef, useState } from "react";

export default function Ticker({ items, speed = 50 }) {
  const tickerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    let animationFrame;
    let position = 0;

    const animate = () => {
      if (!isPaused) {
        position -= 1;
        if (ticker.scrollWidth + position <= 0) {
          position = ticker.offsetWidth;
        }
        ticker.style.transform = `translateX(${position}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [items, isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gradient-to-r from-white via-gray-100 to-white py-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Optional fade edges for effect */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent z-10" />

      <div
        ref={tickerRef}
        className="flex gap-12 text-black font-medium text-sm px-4 transition-transform duration-300 ease-linear"
      >
        {items.map((item, index) => (
          <span
            key={index}
            className="flex-shrink-0 text-gray-800 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
          >
            🔹 {item}
          </span>
        ))}
      </div>
    </div>
  );
}
