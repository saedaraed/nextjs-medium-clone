import useFetchBlogs from "@/hook/useFetchBlogs";
import { useState } from "react";

const popularTags = [
    "Technology",
    "Health",
    "Travel",
    "Finance",
    "Career",
    "Food",
    "Fitness",
    "Books",
    "Art",
    "Science",
    "Environment",
    "Education",
    "Photography",
    "Design",
    "Music",
  ];
const Tags:React.FC=()=>{
  const[topics , setTopics]=useState<any[]>([])
  const { blogs, loading, error } = useFetchBlogs();
console.log("tags" , blogs)
    return(
        <div
              className={`bg-white rounded-lg shadow-md p-5`}
            >
              <h3 className="text-lg font-bold mb-4">Explore Topics</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm cursor-pointer`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
    )
}

export default Tags