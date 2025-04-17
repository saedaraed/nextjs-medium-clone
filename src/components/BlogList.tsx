import React from "react";
import BlogCard from "./BlogCard";
import {Blog} from "@/types/types"

interface BlogListProps {
  blogs: Blog[];
  onDelete: (blogId: string) => void;
  saved: Record<string, boolean>;
  toggleSaved: (blogId: string) => void;
  openDropdown: string | null;
  toggleDropdown: (blogId: string) => void;
  isLoggedIn: boolean; // إضافة حالة المستخدم
}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  onDelete,
  saved,
  toggleSaved,
  openDropdown,
  toggleDropdown,
  isLoggedIn,
}) => {
  
  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onDelete={onDelete}
          isSaved={saved[blog.id] || false}
          toggleSaved={toggleSaved}
          isDropdownOpen={openDropdown === blog.id}
          toggleDropdown={toggleDropdown}
          isLoggedIn={isLoggedIn} 
        />
      ))}
    </div>
  );
};

export default BlogList;
