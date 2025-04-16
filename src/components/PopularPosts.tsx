import React from "react";

const PopularPosts: React.FC = () => {
    const popularPosts = [
        {
          id: 101,
          title: "How to Build a Successful Remote Work Routine",
          readTime: "6 min",
          imageUrl:
            "https://readdy.ai/api/search-image?query=Professional%20home%20office%20setup%20with%20ergonomic%20chair%2C%20laptop%2C%20plants%2C%20natural%20lighting%2C%20organized%20desk%2C%20modern%20minimalist%20design%2C%20productive%20work%20environment%2C%20cozy%20atmosphere&width=100&height=100&seq=7&orientation=squarish",
        },
        {
          id: 102,
          title: "The Science Behind Intermittent Fasting",
          readTime: "8 min",
          imageUrl:
            "https://readdy.ai/api/search-image?query=Scientific%20visualization%20of%20intermittent%20fasting%20effects%20on%20human%20body%2C%20clock%20showing%20time-restricted%20eating%20window%2C%20healthy%20meal%20preparation%2C%20medical%20illustration%20style%2C%20educational%20content%2C%20clean%20background&width=100&height=100&seq=8&orientation=squarish",
        },
        {
          id: 103,
          title: "Beginner's Guide to Cryptocurrency Investing",
          readTime: "10 min",
          imageUrl:
            "https://readdy.ai/api/search-image?query=Digital%20cryptocurrency%20visualization%20with%20bitcoin%2C%20ethereum%20symbols%2C%20financial%20charts%2C%20secure%20blockchain%20technology%20concept%2C%20blue%20and%20gold%20color%20scheme%2C%20professional%20financial%20illustration%2C%20clean%20background&width=100&height=100&seq=9&orientation=squarish",
        },
        {
          id: 104,
          title: "5 Essential Photography Tips for Stunning Photos",
          readTime: "5 min",
          imageUrl:
            "https://readdy.ai/api/search-image?query=Professional%20camera%20with%20lens%20on%20tripod%2C%20golden%20hour%20lighting%2C%20photography%20equipment%2C%20landscape%20setting%2C%20technical%20photography%20setup%2C%20shallow%20depth%20of%20field%2C%20artistic%20composition&width=100&height=100&seq=10&orientation=squarish",
        },
        {
          id: 105,
          title: "Mental Health Awareness: Breaking the Stigma",
          readTime: "9 min",
          imageUrl:
            "https://readdy.ai/api/search-image?query=Supportive%20mental%20health%20concept%20with%20diverse%20group%20of%20people%20in%20circle%2C%20soft%20calming%20colors%2C%20professional%20counseling%20setting%2C%20compassionate%20atmosphere%2C%20symbolic%20representation%20of%20community%20support&width=100&height=100&seq=11&orientation=squarish",
        },
      ];

  return (
    <div
    className={`bg-white rounded-lg shadow-md p-5 mb-6`}
  >
    <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
    <div className="space-y-4">
      {popularPosts.map((post) => (
        <div key={post.id} className="flex space-x-3 cursor-pointer">
          <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h4 className="font-medium text-sm line-clamp-2">
              {post.title}
            </h4>
            <p
              className={`text-xs  "text-gray-500"} mt-1`}
            >
              <i className="far fa-clock mr-1"></i> {post.readTime}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PopularPosts;
