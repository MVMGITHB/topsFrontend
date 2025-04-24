"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const IplLiveScore = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "d547fb8d-4902-442e-892b-73e787eaaff7";

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(
          `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
        );
        const data = await response.json();

        if (!data || data.status !== "success") {
          throw new Error("Failed to fetch matches");
        }

        // Filter for IPL matches
        const iplMatches = data.data.filter(
          (match) =>
            match.name?.toLowerCase().includes("ipl") ||
            match.series_id?.toLowerCase().includes("ipl")
        );

        setMatches(iplMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading matches...</div>;
  }

  if (matches.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No live IPL matches at the moment.
      </div>
    );
  }

  const pageTitle = "IPL Live Scores | Top5Shots";
  const pageDescription =
    "Stay updated with the latest IPL live scores, match statuses, and detailed insights on ongoing IPL matches. Get real-time updates on your favorite teams!";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="IPL, live scores, cricket, IPL live match, cricket score" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/path-to-your-image.jpg" />
      </Head>

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          IPL Live Scores
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {match.name}
              </h2>
              <p className="text-gray-600 mb-1">
                {match.date} | {match.venue}
              </p>
              <p className="text-gray-700">{match.status}</p>
              {match.score && match.score.length > 0 && (
                <div className="mt-2">
                  {match.score.map((inning, index) => (
                    <p key={index} className="text-gray-800">
                      {inning.inning}: {inning.runs}/{inning.wickets} (
                      {inning.overs} overs)
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IplLiveScore;
