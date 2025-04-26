"use client";
import BlogList from "@/components/BlogList";
import { useAuth } from "@/context/AuthContext";
import { Timestamp } from "firebase/firestore";
import React, {  useEffect, useState } from "react";
import CategoryTabs from "@/components/CategoryTabs";
import RecommendedTopics from "@/components/RecommendedTopics";
import PopularPosts from "@/components/PopularPosts";
import useFetchBlogs from "@/hook/useFetchBlogs";
import Tags from "@/components/TagsSection";
import NewsletterSubscribtion from "@/components/NewsLetterSubscribtions";
import UnauthHero from "@/components/UnauthHero";
import { Blog } from "@/types/types";
import useBlogActions from "@/hook/useBlogAction";

const Home: React.FC = () => {
  const[owner , setOwner]=useState<boolean>(false)
  const { user } = useAuth(); 
  const [activeTab, setActiveTab] = useState<string>("Featured");
  const { blogs } = useFetchBlogs({ category: activeTab === "Featured" ? undefined : activeTab.toLowerCase() });
  const { saved, openDropdown, toggleSaved, toggleDropdown, handleDeleteBlog } = useBlogActions();


  useEffect(() => {
    if (user && blogs.length > 0) {
      const isOwner = blogs.some(blog => blog.authorName === user.displayName);
      setOwner(isOwner);
    }
  }, [user, blogs]); 

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


  return (
    <div>
      {user ? (
        <div className="container mx-auto px-4 py-30">
          <div className={`bg-white  rounded-lg p-4 mb-6`}>
            <h2 className="text-xl font-semibold" style={{ fontFamily: "'Pacifico', cursive" }}>
              Welcome,{" "}
              <span className={`text-[#687451]`}>{user?.displayName}</span>!
            </h2>
            <p className={`text-gray-600 mt-1`}>
            Write, share, and leave your impact. This is the space to inspire you.
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
                isLoggedIn={owner}
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
