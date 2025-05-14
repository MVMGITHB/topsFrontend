import React from "react";

const BodyContent = ({ html }) => {
  if (!html) return null;

  return (
    <div
      className="text-sm text-gray-700 px-2"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default BodyContent;
