import React from "react";

const RecommendedTopics: React.FC = () => {
  const topics = ["Technology", "Lifestyle", "Travel", "Food", "Entertainment"];

  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Recommended Topics</h3>
      <ul className="space-y-2">
        {topics.map(topic => (
          <li key={topic}>
            <button className="text-[#bd88c9] hover:underline">{topic}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedTopics;
