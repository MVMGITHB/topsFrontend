import AutoCrousel from "./AutoCrousel";

function Article() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 m-[10px] py-10  text-white">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Offer Cards */}
          <div className="flex flex-col gap-6 w-full max-w-xs">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-amber-600 text-center shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition"
              >
                <img
                  src="https://cdn.logojoy.com/wp-content/uploads/20250107124119/nike-shoe-logo.webp"
                  alt="Fashion"
                  className="aspect-video object-cover rounded-lg"
                />
                <h1 className="text-white font-semibold text-base mt-3">
                  Special Offer
                </h1>
                <button className="text-white text-sm bg-gray-900 px-3 py-1.5 rounded hover:bg-gray-800 mt-3 transition">
                  Buy now
                </button>
              </div>
            ))}
          </div>

          {/* Center: Book Highlight */}
          <div className="w-full lg:w-[60%] bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
            <h1 className="text-2xl font-bold text-center lg:text-left">
              Top Five Books to Read This Month 📚
            </h1>

            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              <img
                src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                alt="book"
                className="w-full md:w-40 lg:w-48 h-auto object-cover rounded-lg shadow"
              />

              <p className="text-sm text-gray-300 leading-relaxed">
                Dive into a world of suspense, romance, and wisdom with our top
                book pick of the month. These thrilling narratives captivate the
                imagination and awaken the storyteller in you. Whether you're a
                seasoned reader or just starting out, you’ll be hooked cover to
                cover. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                In officiis molestias laborum et accusamus voluptatibus possimus
                nostrum eveniet pariatur ipsam asperiores cum officia beatae,
                reprehenderit necessitatibus dolorum deleniti. Vel quam,
                distinctio esse vitae id adipisci quia tenetur! Quidem sit,
                laboriosam veniam, molestias doloremque quos et maiores vel quo
                quisquam fuga!
              </p>
            </div>

            {/* Carousel Ad */}
            <div className="mt-4 overflow-hidden rounded-xl ">
              <AutoCrousel />
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              Bonus: These reads are handpicked by our editorial team based on
              popularity, feedback, and excellence. Grab a coffee, snuggle up,
              and lose yourself in the pages of something truly wonderful.
            </p>
          </div>

          {/* Right: Extra Cards */}
          <div className="flex flex-col gap-6 w-full max-w-xs">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-amber-800 text-center shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition"
              >
                <img
                  src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg"
                  alt="Product"
                  className="aspect-video object-cover rounded-lg"
                />
                <h1 className="text-white font-semibold text-base mt-3">
                  New Arrival
                </h1>
                <button className="text-white text-sm bg-gray-900 px-3 py-1.5 rounded hover:bg-gray-800 mt-3 transition">
                  Shop now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
