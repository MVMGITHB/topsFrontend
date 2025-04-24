export default function Header() {
  return (
    <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white p-8 sm:p-12 text-left shadow-xl rounded-2xl h-full relative overflow-hidden animate-fadeIn">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 opacity-20 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/3 z-0" />

      <div className="max-w-xl z-10 relative">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight animate-slideUp">
          Discover the <span className="text-blue-400">Top 5</span> Shots
        </h1>
        <h2 className="text-xl sm:text-2xl mt-4 text-gray-300 font-light">
          Handpicked excellence in products, services, and more—so you never settle for less.
        </h2>
        <p className="mt-6 text-sm sm:text-base text-gray-400 max-w-md">
          Whether you're browsing, comparing, or discovering—Top5shots brings you the internet’s finest, in five.
        </p>
        <div className="mt-8">
          <a
            href="#explore"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition transform hover:scale-105"
          >
            Explore Now
          </a>
        </div>
      </div>
    </div>
  );
}
