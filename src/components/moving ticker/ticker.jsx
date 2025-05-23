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
      className="relative w-full overflow-hidden bg-[#0B1120] text-white  px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#0B1120] to-transparent z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#0B1120] to-transparent z-10" />

      <div className="flex items-center gap-12 text-base font-medium leading-6 h-8">
        <div
          ref={tickerRef}
          className="flex items-center gap-1 whitespace-nowrap transition-transform duration-300 ease-linear"
        >
          {items.map((item, index) => (
            <span
              key={index}
              className="flex-shrink-0 text-gray-200  hover:text-white transition-colors duration-200 cursor-pointer tracking-wide"
            >
              <span className=" text-gray-300 font-bold">|</span> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
