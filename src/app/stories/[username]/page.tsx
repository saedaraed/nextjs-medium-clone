"use client"
import { useParams ,notFound  } from "next/navigation";
import BlogList from "@/components/BlogList"; 
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useFetchBlogs from "@/hook/useFetchBlogs";
import { firestore } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { Blog } from "@/types/types";


const Stories:React.FC =()=>{
    const params = useParams();
    const username = params.username as string;
    const [isOwner, setIsOwner] = useState<boolean | null>(null); 
    const [blogs, setBlogs] = useState<Blog[]>([]);

// كل ما تغيرت fetchedBlogs، خزنيها محلياً

    const { blogs: fetchedBlogs, loading, error } = useFetchBlogs({ authorName: username });
  const cookieUser = Cookies.get("user"); 
  const parsedUser = cookieUser ? JSON.parse(cookieUser) : null;

   useEffect(() => {
    if (!parsedUser || parsedUser.displayName !== username) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [parsedUser, username]);

  if (isOwner === false) {
    notFound();
  }
  useEffect(() => {
    setBlogs(fetchedBlogs);
  }, [fetchedBlogs]);
    const handleDeleteBlog = async (blogId: string) => {
      try {
        const blogRef = doc(firestore, "blogs", blogId);
        await deleteDoc(blogRef);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
        console.log("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    };
    const [saved, setSaved] = useState<Record<string, boolean>>({});
  
  
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
    const toggleDropdown = (blogId: string) => {
      if (openDropdown === blogId) {
        setOpenDropdown(null);
      } else {
        setOpenDropdown(blogId);
      }
    };
    const toggleSaved = (blogId: string) => {
      setSaved((prev) => ({
        ...prev,
        [blogId]: !prev[blogId],
      }));
    };
  
    return(
<>
<div className="max-w-4xl mx-auto px-4 py-20">
      

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No stories found.</p>
      ) : (

        <div className="space-y-6">
       {isOwner !== null && (
  <BlogList
    blogs={blogs}
    onDelete={handleDeleteBlog}
    saved={saved}
    toggleSaved={toggleSaved}
    openDropdown={openDropdown}
    toggleDropdown={toggleDropdown}
    isLoggedIn={isOwner}
  />
)}
        </div>      )}
    </div>

</>
    )
}
export default Stories;