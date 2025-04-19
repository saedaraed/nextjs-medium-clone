"use client";
import { deleteDoc, doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { firestore } from "../../../lib/firebase";
import Cookies from "js-cookie";
import BlogList from "../../../components/BlogList";
import {Blog} from "@/types/types"
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
import useFetchBlogs from "@/hook/useFetchBlogs";

interface UserData {
  username?: string;
  email?: string;
  bio?: string;
}

const UserProfile: React.FC = () => {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<UserData | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const cookieUser = Cookies.get("user"); 
  const parsedUser = cookieUser ? JSON.parse(cookieUser) : null;
  const { blogs } = useFetchBlogs({ authorName: username });
  useEffect(() => {
    if (!username || !parsedUser) return;
  
    const fetchUserData = async () => {
      try {
        const q = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.log("No user found with that username!");
          return;
        }
  
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
  
        const isCurrentUser = userData.username === parsedUser.displayName;
        setIsOwner(isCurrentUser);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [username, parsedUser]);
  
  

  console.log("user profile", user);
  const handleDeleteBlog = async (blogId: string) => {
    try {
      const blogRef = doc(firestore, "blogs", blogId);
      await deleteDoc(blogRef);
      window.location.reload();
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

  // const closeDropdowns = () => {
  //   setOpenDropdown(null);
  // };
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div
        className="flex flex-col items-center mb-12"
        //   onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-4">
          <img
            src="https://public.readdy.ai/ai/img_res/dfa349a824891dfcee0b30fb924aa42c.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {user?.username}
        </h1>
        <p className="text-gray-600 text-center max-w-md mb-4">{user?.bio}</p>
        <div className="flex items-center mb-6">
          <div className="flex items-center mr-6">
            <i className="fas fa-user-friends text-gray-500 mr-2"></i>
            <span className="font-semibold text-gray-700">1,248</span>
            <span className="text-gray-500 ml-1">Followers</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-user-plus text-gray-500 mr-2"></i>
            <span className="font-semibold text-gray-700">284</span>
            <span className="text-gray-500 ml-1">Following</span>
          </div>
        </div>
        {isOwner && ( 
          <button className="px-6 py-2 border border-gray-300 rounded-button text-gray-700 hover:bg-gray-100 transition duration-200 flex items-center whitespace-nowrap cursor-pointer">
            <i className="fas fa-edit mr-2"></i>
            Edit Profile
          </button>
        )}
      </div>
      {isOwner ? (
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">My Blogs</h2>
          <Link href="/new-story" className="bg-indigo-600 text-white px-6 py-2.5 rounded-button hover:bg-indigo-700 transition duration-200 flex items-center shadow-sm whitespace-nowrap cursor-pointer">
            <i className="fas fa-plus mr-2"></i>
            Create Story
          </Link>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-gray-800">Blogs</h2>
        </div>
      )}

      <div className="space-y-6">
      <BlogList
        blogs={blogs}
        onDelete={handleDeleteBlog}
        saved={saved}
        toggleSaved={toggleSaved}
        openDropdown={openDropdown}
        toggleDropdown={toggleDropdown}
        isLoggedIn={isOwner}
      />
      </div>
    </div>
  );
};

export default UserProfile;
