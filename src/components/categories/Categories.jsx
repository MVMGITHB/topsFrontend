// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import base_url from "../helper/baseurl";

// // Optional fallback icons if API doesn’t return them
// const fallbackIcons = {
//   Automobile: "/images/car.png",
//   "Fashion and Lifestyle": "/images/fashion.png",
//   Fitness: "/svg/fitness.svg",
//   Ecommerce: "/images/ecommerce.png",
//   Finance: "/images/finance.png",
//   "Real Estate": "/images/realestate.png",
//   Gaming: "/images/gaming.png",
//   Politics: "/images/politics.png",
//   Sport: "/images/sports.png",
//   Education: "/images/education.png",
//   Travel: "/svg/travel.svg",
// };
// // const fallbackIcons = {
// //   Automobile: "/newicons/bikeicon1.png",
// //   "Fashion and lifestyle": "/newicons/Fashion2.png",
// //   Fitness: "/newicons/fitness.svg",
// //   Ecommerce: "/newicons/Ecommerce2.png",
// //   Finance: "/newicons/finance.png",
// //   "Real Estate": "/newicons/realestate.png",
// //   Gaming: "/newicons/gaming.png",
// //   Politics: "/newicons/politics.png",
// //   Sport: "/newicons/sports.png",
// //   Education: "/newicons/Education1.png",
// //   Travel: "/newicons/travel.svg",
// // };
// const fallbackIconsleft = {
//   Automobile: "/newicons/bikeicon1.png",
//   "Fashion and lifestyle": "/newicons/Fashion2.png",
//   Fitness: "/newicons/fitness.svg",
//   Ecommerce: "/newicons/Ecommerce2.png",
//   Finance: "/newicons/finance.png",
//   "Real Estate": "/newicons/realestate.png",
//   Gaming: "/newicons/gaming.png",
//   Politics: "/newicons/politics.png",
//   Sport: "/newicons/sports.png",
//   Education: "/newicons/Education1.png",
//   Travel: "/newicons/travel.svg",
// };
// const fallbackIconsright = {
//   Automobile: "/newicons/bikeicon1.png",
//   "Fashion and lifestyle": "/newicons/Fashion2.png",
//   Fitness: "/newicons/fitness.svg",
//   Ecommerce: "/newicons/Ecommerce2.png",
//   Finance: "/newicons/finance.png",
//   "Real Estate": "/newicons/realestate.png",
//   Gaming: "/newicons/gaming.png",
//   Politics: "/newicons/politics.png",
//   Sport: "/newicons/sports.png",
//   Education: "/newicons/Education1.png",
//   Travel: "/newicons/travel.svg",
// };

// export default function CategoryPage() {
//   const [categories, setCategories] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(base_url + "/category");
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error.message);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (cat) => {
//     const categorySlug = cat.slug?.toLowerCase();
//     if (categorySlug) {
//       router.push(`/${categorySlug}`);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto h-auto ">
//       <div className="px-5">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-7  ">
//           {categories.map((cat, index) => {
//             const title = cat.title || cat.name || "Unnamed";
//             const icon =
//               cat.icon || fallbackIcons[title]

//             return (
//               <div
//                 key={index}
//                 onClick={() => handleCategoryClick(cat)}
//                 className="relative cursor-pointer bg-gray-100 border-gray-400 text-black rounded-2xl p-4 h-32 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2c003e] hover:to-[#4B0082] hover:text-white hover:shadow-lg hover:scale-105 focus:bg-gradient-to-br focus:from-[#2c003e] focus:to-[#4B0082] focus:text-gray focus:shadow-lg focus:scale-105 font-serif"
//               >
//                 {/* Left Decorative Image */}
//                 <img
//                   src="/images/left-decor.png"
//                   alt="Left decoration"
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8"
//                 />

//                 {/* Right Decorative Image */}
//                 {/* <img
//                   src="/images/right-decor.png"
//                   alt="Right decoration"
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8"
//                 /> */}

//                 {/* Center Icon */}
//                 <img
//                   src={icon}
//                   alt={`${title} icon`}
//                   className="w-20 h-18 mb-2 transition-transform duration-300"
//                 />
//                 <span className="text-xl sm:text-xl font-light transition-colors duration-300">
//                   {title}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import base_url from "../helper/baseurl";

// Center icon fallback (if API doesn't return one)
const fallbackIcons = {
  Automobile: "/newicons/car.png",
  "Fashion and lifestyle": "/newicons/fashion.png",
  Fitness: "/newicons/fitness.svg",
  Ecommerce: "/newicons/ecommerce.png",
  Finance: "/newicons/finance.png",
  "Real Estate": "/newicons/RealEst3.png",
  Gaming: "/newicons/Gaming4.png",
  Politics: "/newicons/politics.png",
  Sport: "/newicons/Sports1.png",
  Education: "/newicons/education.png",
  Travel: "/newicons/Travel3.png",
};

// Left side icons
const fallbackIconsleft = {
  Automobile: "/newicons/bikeicon1.png",
  "Fashion and lifestyle": "/newicons/Fashion2.png",
  Fitness: "/newicons/fitness.svg",
  Ecommerce: "/newicons/Ecommerce1.png",
  Finance: "/newicons/finance.png",
  "Real Estate": "/newicons/realestate.png",
  Gaming: "/newicons/Gaming2.png",
  Politics: "/newicons/politics.png",
  Sport: "/newicons/Sports2.png",
  Education: "/newicons/Education2.png",
  Travel: "/newicons/Travel2.png",
};

// Right side icons
const fallbackIconsright = {
  Automobile: "/newicons/Caricon1.png",
  "Fashion and lifestyle": "/newicons/Fashion2.png",
  Fitness: "/newicons/fitness.svg",
  Ecommerce: "/newicons/Ecommerce2.png",
  Finance: "/newicons/finance.png",
  "Real Estate": "/newicons/realestate.png",
  Gaming: "/newicons/Gaming3.png",
  Politics: "/newicons/politics.png",
  Sport: "/newicons/Sports3.png",
  Education: "/newicons/Education1.png",
  Travel: "/newicons/Travel4.png",
};

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(base_url + "/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    const categorySlug = cat.slug?.toLowerCase();
    if (categorySlug) {
      router.push(`/${categorySlug}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-auto">
      <div className="px-5">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-7">
          {categories.map((cat, index) => {
            const title = cat.title || cat.name || "Unnamed";
            const icon = cat.icon || fallbackIcons[title];
            const leftIcon = fallbackIconsleft[title];
            const rightIcon = fallbackIconsright[title];

            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(cat)}
                className="relative cursor-pointer bg-gray-100 border-gray-400 text-black rounded-2xl p-4 h-32 flex flex-col items-center justify-center text-center shadow-md transition-all duration-300 hover:bg-gradient-to-br hover:from-[#2c003e] hover:to-[#4B0082] hover:text-white hover:shadow-lg hover:scale-105 font-serif"
              >
                {/* Left Icon */}
                {leftIcon && (
                  <img
                    src={leftIcon}
                    alt={`${title} left icon`}
                    className="absolute left-2 right-2 bottom-0 transform -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 "
                  />
                )}

                {/* Right Icon */}
                {rightIcon && (
                  <img
                    src={rightIcon}
                    alt={`${title} right icon`}
                    className="absolute right-2 bottom-0 transform -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10"
                  />
                )}

                {/* {/* Center Icon */}
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className="absolute center bottom-0 transform -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10"
                />

                {/* Title */}
                <span className="text-xl font-light transition-colors duration-300 mb-8 sm:mb-12 md:mb-12">
                  {title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
