import React from "react";

// Metadata for SEO
export const metadata = {
  title: "Contests | Top5Shots",
  description:
    "Discover exciting contests at Top5Shots! Participate, win, and showcase your skills. Check out the latest contests happening now.",
};

const page = () => {
  return (
    <div className="bg-gray-900 text-gray-400 p-8">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-white">Contests</h1>
        <p className="text-base text-gray-300 mt-2">
          Participate in our exciting contests, showcase your talent, and win
          amazing prizes!
        </p>
      </div>

      {/* Active Contests Section */}
      <section className="mb-12">
        <h2 className="text-2xl text-white mb-4">Active Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl text-white font-semibold">
                Contest Title {index + 1}
              </h3>
              <p className="text-gray-300 mt-2">
                Description of contest {index + 1}. Join now to win amazing
                prizes!
              </p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Participate
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Contests Section */}
      <section className="mb-12">
        <h2 className="text-2xl text-white mb-4">Upcoming Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[4, 5, 6].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl text-white font-semibold">
                Upcoming Contest {index + 1}
              </h3>
              <p className="text-gray-300 mt-2">
                Description of upcoming contest {index + 1}. Don't miss out on
                the opportunity!
              </p>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Past Contests Section */}
      <section>
        <h2 className="text-2xl text-white mb-4">Past Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[7, 8, 9].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl text-white font-semibold">
                Past Contest {index + 1}
              </h3>
              <p className="text-gray-300 mt-2">
                Check out the winners and highlights from past contests. Stay
                tuned for future events!
              </p>
              <button className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                View Results
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default page;
