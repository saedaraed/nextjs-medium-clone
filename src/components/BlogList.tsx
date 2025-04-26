import React from "react";
import BlogCard from "./BlogCard";
import {Blog} from "@/types/types"

interface BlogListProps {
  blogs: Blog[];  // مصفوفة من المقالات التي سيتم عرضها
  onDelete: (blogId: string) => void;  // وظيفة لحذف المقال
  saved: Record<string, boolean>;  // حالة حفظ المقالات (مقال تم حفظه أم لا)
  toggleSaved: (blogId: string) => void;  // وظيفة لتغيير حالة الحفظ
  openDropdown: string | null;  // تتبع المقال الذي تم فتح القائمة المنسدلة له
  toggleDropdown: (blogId: string) => void;  // وظيفة لتبديل القائمة المنسدلة
  isLoggedIn?: boolean;  // حالة تسجيل الدخول للمستخدم
  isCompact?:boolean

}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  onDelete,
  saved,
  toggleSaved,
  openDropdown,
  toggleDropdown,
  isLoggedIn,
  isCompact
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
          isCompact={isCompact}
        />
      ))}
    </div>
  );
};

export default BlogList;
