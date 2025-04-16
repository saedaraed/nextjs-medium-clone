"use client";
import BlogList from "@/components/BlogList";
import { useAuth } from "@/context/AuthContext";
import { firestore } from "@/lib/firebase";
import { deleteDoc, doc, Timestamp } from "firebase/firestore";
import React, {  useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import RecommendedTopics from "@/components/RecommendedTopics";
import PopularPosts from "@/components/PopularPosts";
import useFetchBlogs from "@/hook/useFetchBlogs";
import Tags from "@/components/TagsSection";
import NewsletterSubscribtion from "@/components/NewsLetterSubscribtions";
import UnauthHero from "@/components/UnauthHero";
import { Blog } from "@/types/types";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("Featured");

  const { blogs } = useFetchBlogs({ category: activeTab === "Featured" ? undefined : activeTab.toLowerCase() });

  const isOwner = false;

  const blogsWithCategory: Blog[] = blogs.map((blog) => {
    const createdAt =
      blog.createdAt instanceof Date
        ? blog.createdAt
        : (blog.createdAt as Timestamp)?.toDate?.() || new Date();
  
    return {
      ...blog,
      category: blog.category || "Uncategorized",
      createdAt,
    };
  });


  const handleDeleteBlog = async (blogId: string) => {
    try {
      const blogRef = doc(firestore, "blogs", blogId);
      await deleteDoc(blogRef);
      // setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      console.log("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  const [saved, setSaved] = useState<Record<string, boolean>>({
    blog1: true,
    blog2: false,
    blog3: true,
  });

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

  return (
    <div>
      {user ? (
        <div className="container mx-auto px-4 py-40">
          <div className={`bg-white  rounded-lg p-4 mb-6`}>
            <h2 className="text-xl font-semibold">
              Welcome,{" "}
              <span className={`text-[#bd88c9]`}>{user?.displayName}</span>!
            </h2>
            <p className={`text-gray-600 mt-1`}>
              Discover new ideas and perspectives on topics that matter to you.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <CategoryTabs
                categories={[
                  "Featured",
                  "Technology",
                  "Lifestyle",
                  "Travel",
                  "Food",
                  "Entertainment",
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
              <BlogList
                blogs={blogsWithCategory}
                onDelete={handleDeleteBlog}
                saved={saved}
                toggleSaved={toggleSaved}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                isLoggedIn={isOwner}
              />
            </div>
            <div className="w-full md:w-1/3">
              {/* Recommended Topics */}
              <RecommendedTopics />

              {/* Popular Posts */}
              <PopularPosts />

              {/* Newsletter Subscription */}

              <NewsletterSubscribtion />

              <Tags />
            </div>
          </div>
        </div>
      ) : (
     <UnauthHero/>
      )}
    </div>
  );
};

export default Home;
