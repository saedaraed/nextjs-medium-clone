// import Link from "next/link";
import { Blog } from "@/types/types";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
  onDelete: (blogId: string) => void;
  isSaved: boolean;
  toggleSaved: (blogId: string) => void;
  isDropdownOpen: boolean;
  toggleDropdown: (blogId: string) => void;
  isLoggedIn?: boolean;
  isCompact?:boolean
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  onDelete,
  isSaved,
  toggleSaved,
  isDropdownOpen,
  toggleDropdown,
  isLoggedIn,
  isCompact,
}) => {
  console.log("authorname", blog.authorName);

  return (
    <div className=" bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ">
      <div className={`flex flex-col ${!isCompact ? "md:flex-row" : ""}`}>
        <div className={`${!isCompact ? "md:w-1/3":""}  ${!isCompact ? "h-64" :" h-40 "} ${!isCompact ? "md:h-[200px]" :""}overflow-hidden`}>
          <img
            className="full-cover w-full h-full"
            src={blog.image}
            alt="image"
          />
        </div>
        <div className={`${!isCompact ?"md:w-2/3" :""} p-6 flex flex-col justify-between`}>
          <div className="flex mb-3 items-center justify-between">
            <div className="flex items-center space-x-4 ">
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-[#e8e0bb] text-[#687451]">
                {blog.category}
              </span>

              <span className="text-sm  text-gray-500">
                {blog.createdAt
                  ? blog.createdAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No Date"}
              </span>
              </div>
              <div className="flex flex-col md:flex-row">
                {/* <div className="flex gap-2">
          <img src="" alt="username" />
          <span>{blog?.authorName}</span>
        </div> */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleSaved(blog.id)}
                    className="text-gray-500 hover:text-indigo-600 transition duration-200 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${
                        isSaved ? "text-indigo-600" : "text-gray-400"
                      } h-6 w-6`}
                    >
                      <path d="M6 2h12a2 2 0 0 1 2 2v18l-7-3-7 3V4a2 2 0 0 1 2-2z"></path>
                    </svg>
                  </button>

                  {isLoggedIn && ( 
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(blog.id);
                        }}
                        className="text-gray-500 hover:text-gray-700 transition duration-200 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal text-lg"
                          width="24"
                          height="24"
                        >
                          <path d="M3 12h18M3 6h18M3 18h18"></path>
                        </svg>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(blog.id)}
                              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              
            </div>
          </div>
          <h3 className="text-l font-bold hover:text-[#687451] transition-colors">
            {blog.title}
          </h3>

          <p className={`text-l text-gray-600 mb-3  ${!isCompact ? "block" : "hidden"} `}>
            {blog.content.length > 120
              ? `${blog.content.slice(0, 120)}...`
              : blog.content}
          </p>

          <Link href={`/blogs/${blog.id}`} className="block text-[#3b0014] font-bold">
            read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
