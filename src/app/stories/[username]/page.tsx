"use client";
import { useParams, notFound } from "next/navigation";
import BlogList from "@/components/BlogList";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import useFetchBlogs from "@/hook/useFetchBlogs";
import useBlogActions from "@/hook/useBlogAction";

const Stories: React.FC = () => {
  const params = useParams();
  const username = params.username as string;
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  const {
    blogs: fetchedBlogs,
    loading,
    error, setBlogs
  } = useFetchBlogs({ authorName: username });
  const { saved, openDropdown, toggleSaved, toggleDropdown, handleDeleteBlog } =
    useBlogActions({}, setBlogs);

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

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-30">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : fetchedBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No stories found.</p>
        ) : (
          <div className="space-y-6">
            {isOwner !== null && (
              <BlogList
                blogs={fetchedBlogs}
                onDelete={handleDeleteBlog}
                saved={saved}
                toggleSaved={toggleSaved}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                isLoggedIn={isOwner}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default Stories;
