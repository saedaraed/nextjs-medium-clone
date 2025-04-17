import Link from "next/link";
import {Blog} from "@/types/types"

interface BlogCardProps {
    blog: Blog;
    onDelete: (blogId: string) => void;
    isSaved: boolean;
    toggleSaved: (blogId: string) => void;
    isDropdownOpen: boolean;
    toggleDropdown: (blogId: string) => void;
    isLoggedIn: boolean; 

  }
  
  const BlogCard: React.FC<BlogCardProps> = ({
    blog,
    onDelete,
    isSaved,
    toggleSaved,
    isDropdownOpen,
    toggleDropdown,
    isLoggedIn,
    
  }) => {
  
    console.log('authorname', blog.authorName)
  
    return (
      <div className=" bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition duration-200 hover:shadow-md">
   <div className="flex justify-between items-center ">
    <div className="flex gap-2">
<img src="" alt="username" />
<span>{blog?.authorName}</span>
    </div>
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
  
              {isLoggedIn && ( // إظهار الزر فقط إذا كان المستخدم مسجلاً
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
    <div className="flex justify-between items-center">
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
         
          </div>
  
          <p className="text-gray-600 mb-3">
            {blog.content.length > 150
              ? `${blog.content.slice(0, 150)}...`
              : blog.content}
          </p>
  
          <div className="flex items-center text-sm text-gray-500">
          <span>
          {blog.createdAt
    ? blog.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No Date"}
</span>          </div>
          {blog.category && (
  <p className="text-[#bd88c9] mb-3">
    {blog.category}
  </p>
)}
          <Link href={`/blogs/${blog.id}`} className="block">
            read more
          </Link>
        </div>
        <div className="w-[150px] h-[100px]">
          <img className="full-cover w-full h-full" src={blog.image} alt="image" />
        </div>
        </div>
      </div>
    );
  };
  
  export default BlogCard;
  