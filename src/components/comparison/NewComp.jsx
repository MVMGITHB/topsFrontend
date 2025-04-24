"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, Search, Star } from "lucide-react";
import Link from "next/link"; // Import Link component from Next.js
import base_url from "../helper/baseurl";

export default function NewComp({id}) {
  const [comparisons, setComparisons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [data,setData] = useState([])

 


  const fetchData = async()=>{
      try {
        const response = await axios.get(`${base_url}/getOnecompblogs/${id}`)
       
        setData(response.data)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    fetchData()
  },[])

  
  return (
    <div className="relative overflow-x-auto shadow-md bg-white dark:bg-gray-900 mb-10">
      <div className="flex flex-wrap md:flex-row justify-between items-center space-y-4 md:space-y-0 p-4 border-b dark:border-gray-700">
        {/* Search Bar */}
        <div className="relative w-full md:w-auto mb-4">
          <Search className="absolute top-2.5 left-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search for credit cards"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-80 pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3">Features</th>
            <th className="px-6 py-3">Rating</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.company?.map((card, index) => (
            <tr
              key={index}
              className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-6 py-4 text-center text-gray-900 dark:text-white">
                <div className="flex flex-col items-center gap-2">
                  {card?.logo && (
                    <img
                      src={card?.logo}
                      alt={card?.websiteName}
                      className="w-12 h-12 object-contain rounded-md"
                    />
                  )}
                  {/* Wrap the website name with Link */}
                  <Link
                     href={`/company/${card._id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {card?.websiteName}
                  </Link>
                </div>
              </td>

              <td className="px-6 py-4">
                <ul className="list-disc ml-4 space-y-1">
                  {card?.features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(Math.floor(card?.rating))].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="text-white ml-2.5">
                    {card?.rating.toFixed(1)}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <Link
                  href={`/company/${card._id}`}
                  className="inline-block text-white text-sm font-semibold bg-blue-600 px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Visit Site
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

   

    
  );
}
