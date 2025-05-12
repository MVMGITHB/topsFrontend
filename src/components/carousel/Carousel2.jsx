// "use client";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import base_url from "../helper/baseurl";
// import Link from "next/link";

// // NewsCard component
// const NewsCard = ({ title, source, date, image, updatedAt }) => {
//   const formattedDateTime = new Date(updatedAt || date).toLocaleString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   return (
//     <div className="h-44 flex flex-col justify-between p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out mx-2">
//       <div className="flex items-center gap-4 mb-4">
//         <img
//           src={image}
//           alt={source}
//           className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
//         />
//         <div>
//           <h3 className="text-md font-semibold text-gray-800">{source}</h3>
//           <p className="text-xs text-gray-500">{formattedDateTime}</p>
//         </div>
//       </div>
//       <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-grow">
//         "{title}"
//       </p>
//     </div>
//   );
// };

// // Main Carousel component
// export default function Crousel() {
//   const [shorts, setShorts] = useState([]);
//   const [blogs, setBlogs] = useState({});

//   useEffect(() => {
//     const fetchTopShorts = async () => {
//       try {
//         const res = await fetch(
//           "https://api.top5shots.com/api/topHeading-shorts/getAlltopHeading"
//         );
//         const data = await res.json();

//         if (Array.isArray(data) && data.length > 0) {
//           const allCompBlogs = data.flatMap((item) => item.compBlog || []);
//           setShorts(allCompBlogs);

//           const blogDetails = await Promise.all(
//             allCompBlogs.map(async (blog) => {
//               const res = await axios.get(
//                 `${base_url}/getOnecompblogs/${blog.slug}`
//               );
//               return res.data;
//             })
//           );

//           const blogMap = {};
//           blogDetails.forEach((blog) => {
//             blogMap[blog.slug] = blog;
//           });

//           setBlogs(blogMap);
//         }
//       } catch (err) {
//         console.error("Error fetching top shorts:", err);
//       }
//     };

//     fetchTopShorts();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 4000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: false,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-3 px-5 md:px-10 mb-5">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 font-serif">
//         Popular Shots
//       </h2>
//       <div className="max-w-7xl mx-auto">
//         <Slider {...settings}>
//           {shorts.map((blog) => (
//             <div key={blog.id}>
//               <Link href={`/${blog?.subcategories?.slug}/${blog.slug}`}>
//                 <NewsCard
//                   title={blog.title}
//                   source={blog.source || "Top5Shots"}
//                   date={blog.date}
//                   updatedAt={blog.updatedAt}
//                   image={blog.image || "/default.jpg"}
//                 />
//               </Link>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// }


// Trending TOP headlines  //popular shots

"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../helper/baseurl";

// Arrows
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronRight size={16} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full cursor-pointer"
    onClick={onClick}
  >
    <FaChevronLeft size={16} />
  </div>
);

// Card Base Layout
const CardLayout = ({ image, title, label, cta, date, author }) => (
  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md cursor-pointer">
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
    />
    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4">
      {label && (
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-sm">
          {label}
        </span>
      )}
      <h2 className="text-white text-lg font-semibold mb-1">{title}</h2>
      {date && author && (
        <div className="flex items-center gap-2 text-xs text-gray-200">
          <span>{date}</span>
          <span className="text-white">•</span>
          <span>{author}</span>
        </div>
      )}
      {cta && (
        <button className="mt-3 bg-white text-black py-1 px-4 rounded hover:bg-gray-100 text-sm w-fit">
          {cta}
        </button>
      )}
    </div>
  </div>
);

export default function TopShotsAndPopularSection() {
  const [shorts, setShorts] = useState([]);
  const [blogs, setBlogs] = useState({});

  useEffect(() => {
    const fetchTopShorts = async () => {
      try {
        const res = await fetch(
          "https://api.top5shots.com/api/trending-shorts/getAllTrendnig"
        );
        const data = await res.json();
        console.log("Top Shorts Raw Data:", data);

        if (Array.isArray(data) && data.length > 0) {
          const allCompBlogs = data.flatMap((item) => item.compBlog || []);
          setShorts(allCompBlogs);

          const blogDetails = await Promise.all(
            allCompBlogs.map(async (blog) => {
              const res = await axios.get(
                `${base_url}/getOnecompblogs/${blog.slug}`
              );
              return res.data;
            })
          );

          const blogMap = {};
          blogDetails.forEach((blog) => {
            blogMap[blog.slug] = blog;
          });

          setBlogs(blogMap);
        }
      } catch (err) {
        console.error("Error fetching top shorts:", err);
      }
    };

    fetchTopShorts();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,             // Transition duration (0.5 seconds)
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,    // Wait 4 seconds before autoplaying to next
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    swipe: true,            // Enables swipe on mobile
    touchMove: true,        // Touch responsiveness
  };
  

  return (
    <section className="w-full bg-white py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold font-serif text-gray-800 text-center mb-4">
          Popular Shots
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left - Carousel */}
          <div className="flex-1 min-w-0 mt-2">
            <Slider {...sliderSettings}>
              {shorts.slice(0, 2).map((shot, index) => (
                <div key={shot.id || shot.slug || index} className="px-2">
                  <a
                    href={`/${shot?.subcategories?.slug}/${shot?.slug}`}
                    className="block"
                  >
                    <CardLayout
                      image={shot.image}
                      title={shot.title}
                      label={shot.label}
                      date={shot.date}
                      author={shot.author}
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>

          {/* Right - Static Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shorts.slice(1, 6).map((card, index) => (
              <a
                key={card.id || card.slug || index}
                href={`/${card?.subcategories?.slug}/${card?.slug}`}
                className="block"
              >
                <CardLayout
                  image={card.image}
                  title={card.title}
                  cta={card.cta}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
