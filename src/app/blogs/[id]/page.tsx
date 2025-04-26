"use client";
import React, { useEffect, useState } from "react";
import {  deleteDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useParams } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/Comments";
import Skelton from "@/components/Skelton";
import useFetchBlogs from "@/hook/useFetchBlogs";
import BlogList from "@/components/BlogList";
import {Blog} from '@/types/types'

const StoryDetails: React.FC = () => {
  const { id } = useParams(); // الحصول على الـ id من الـ URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const { blogs } = useFetchBlogs({ category: blog?.category });
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const docRef = doc(firestore, "blogs", id as string); // جلب المدونة بناءً على الـ id
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data() as Blog);
        } else {
          console.log("No such document!");
        }
        console.log("docSnap", docSnap.data());
        setLoading(false);
      };
      fetchBlog();
    }
  }, [id]);

  const formattedDate = blog?.createdAt
  ? blog.createdAt instanceof Date
    ? blog.createdAt.toLocaleString()
    : (blog.createdAt as Timestamp).toDate().toLocaleString()
  : new Date().toLocaleString();
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
    }); //🔸 تحاكي حالة حفظ المقالات لكل مستخدم (سنربطها بالـ context لاحقاً لتكون ديناميكية).
  
  
  
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  //🔸 تتحكم في منو كل مقال (مثل: تعديل/حذف/حفظ).
  
  
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
  if (loading)
    return (
      <div className="pt-20 container mx-auto">
        <Skelton />
      </div>
    );

  return (
    <>
      <div className="container mx-auto flex gap-[100px]  py-30">
        <div className=" w-[70%] ">
          <div className="mb-6">
          <h1 className="text-2xl text-[#3B0014] font-bold ">
            {blog?.title}
          </h1>
          <p className="text-black/50 text-lg">{blog?.category}</p>
          </div>
        
          <div className="flex gap-4 items-center">
            <img
              src="https://public.readdy.ai/ai/img_res/dfa349a824891dfcee0b30fb924aa42c.jpg"
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <Link href={`/profile/${blog?.authorName}`}>
                <span className="text-black font-bold mr-2">
                  {blog?.authorName}
                </span>
              </Link>
              <span className="text-gray-600">{formattedDate}</span>
            </div>
          </div>
          <div className="border-t border-b border-gray-300 my-4 flex justify-between py-4 px-4">
            <div className="flex gap-2">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.5 8.046H11V6.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49c.624.556 1.524.027 1.524-.893v-1.928h2a3.023 3.023 0 0 1 3 3.046V19a5.593 5.593 0 0 0-1.5-10.954Z"
                />
              </svg>
              {blog?.comments?.length ?? 0}

            </div>
<div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
              />
            </svg>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>

            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01"/>
</svg>

            </div>
      
          </div>
     

          {/* <div className="flex items-center mb-8">
            <Link href={`/profile/${blog?.authorName}`}>
              <span className="text-black font-bold mr-2">
                {blog?.authorName}
              </span>
            </Link>
            <span className="text-gray-600">{formattedDate}</span>
          </div> */}

      
          <div className="prose max-w-none mb-12 font-serif">
            {blog?.content
              .split("\n\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 text-black">
                  {paragraph}
                </p>
              ))}
          </div>
          <div className="mb-6 rounded-md overflow-hidden shadow-md ">
            {/* <Image
            src={blog?.image}
            alt={blog.title}
            width={1200}
            height={200}
            layout="intrinsic"
            className="object-cover w-full h-[200px]"
            style={{ height: '200px' }}
          /> */}
            <img
              src={blog?.image}
              alt={blog?.title}
              className="object-cover w-full h-[400px]"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {blog?.tags?.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-[#687451]/50  text-[#3b0014] px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
          <hr />
          <div className="mt-12">
            {blog && <CommentSection blogId={id as string} />}
          </div>
        </div>
        <div className="w-[30%] "> 
          <h2 className="text-2xl text-[#3B0014] font-bold mb-4">Related Posts</h2>
          <BlogList
                blogs={blogsWithCategory}
                onDelete={handleDeleteBlog}
                saved={saved}
                toggleSaved={toggleSaved}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                isCompact={true}
              /></div>
      </div>
    </>
  );
};

export default StoryDetails;
