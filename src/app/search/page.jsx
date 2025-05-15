// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";

// export default function SearchPage() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";

//   const [results, setResults] = useState({
//     companies: [],
//     blogs: [],
//     compBlogs: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ...

//   useEffect(() => {
//     if (!query.trim()) return;

//     setLoading(true);
//     setError("");

//     axios
//       .get(`/api/search`, { params: { q: query } })
//       .then((res) => {
//         const data = res.data;
//         setResults({
//           companies: data.companies || [],
//           blogs: data.blogs || [],
//           compBlogs: data.compBlogs || [],
//         });
//       })
//       .catch((err) => {
//         console.error("Search error:", err);
//         setError(
//           err.response?.data?.message || err.message || "Something went wrong"
//         );
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [query]);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
//       <h1 className="text-2xl font-bold">
//         Search Results for: <span className="text-purple-600">{query}</span>
//       </h1>

//       {loading && <p className="text-gray-500">Loading results...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}

//       {!loading &&
//         !error &&
//         results.companies.length === 0 &&
//         results.blogs.length === 0 &&
//         results.compBlogs.length === 0 && (
//           <p className="text-gray-500">No results found.</p>
//         )}

//       {/* Companies */}
//       {results.companies.length > 0 && (
//         <section className="space-y-4">
//           <h2 className="text-xl font-semibold text-blue-700">Companies</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {results.companies.map((c) => (
//               <Link
//                 key={c._id}
//                 href={`/company/${c.slug || c._id}`}
//                 className="block bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
//               >
//                 {c.logo && (
//                   <img
//                     src={c.logo}
//                     alt={c.websiteName}
//                     className="w-full h-32 object-contain mb-3"
//                   />
//                 )}
//                 <h3 className="text-lg font-bold">{c.websiteName}</h3>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {c.Description || c.review}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Blogs */}
//       {results.blogs.length > 0 && (
//         <section className="space-y-4">
//           <h2 className="text-xl font-semibold text-green-700">Blogs</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {results.blogs.map((b) => (
//               <Link
//                 key={b._id}
//                 href={`/${b.subcategories?.slug}/${b.slug}`}
//                 className="block bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
//               >
//                 {b.image && (
//                   <img
//                     src={b.image.startsWith("http") ? b.image : `${b.image}`}
//                     alt={b.title}
//                     className="w-full h-32 object-cover mb-3 rounded-md"
//                   />
//                 )}
//                 <h3 className="text-lg font-bold">{b.title}</h3>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {b.excerpt || b.mdesc}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Comparison Blogs */}
//       {results.compBlogs.length > 0 && (
//         <section className="space-y-4">
//           <h2 className="text-xl font-semibold text-purple-700">
//             Comparison Blogs
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {results.compBlogs.map((cb) => (
//               <Link
//                 key={cb._id}
//                 href={`/${cb.subcategories?.slug}/${cb.slug}`}
//                 className="block bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
//               >
//                 {cb.image && (
//                   <img
//                     src={cb.image.startsWith("http") ? cb.image : `${cb.image}`}
//                     alt={cb.title}
//                     className="w-full h-32 object-cover mb-3 rounded-md"
//                   />
//                 )}
//                 <h3 className="text-lg font-bold">{cb.title}</h3>
//                 <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//                   {cb.mdesc || cb.body?.replace(/<[^>]+>/g, "").slice(0, 100)}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }
