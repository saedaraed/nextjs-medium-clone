"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase"; 
import { useParams } from "next/navigation";
// import Image from "next/image";
import Link from "next/link";
import CommentSection from "@/components/Comments";

import Skelton from "@/components/Skelton";

type Blog = {
  title: string;
  image: string;
  authorName: string;
  tags: string[];
  content: string;
  createdAt: {
    toDate: () => Date;
  };
};

const StoryDetails: React.FC = () => {
  const { id } = useParams(); // الحصول على الـ id من الـ URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
  const formattedDate = blog?.createdAt?.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (loading) return <div className="pt-20 container mx-auto"><Skelton/></div>;
  return (
    <>
      <div className="pt-40 container w-[60%] mx-auto ">
        <h1 className="text-4xl font-bold text-black mb-6">{blog?.title}</h1>
        <div className="mb-6 rounded-lg overflow-hidden shadow-md ">
          {/* <Image
            src={blog?.image}
            alt={blog.title}
            width={1200}
            height={200}
            layout="intrinsic"
            className="object-cover w-full h-[200px]"
            style={{ height: '200px' }}
          /> */}
          <img   src={blog?.image}
            alt={blog?.title}  className="object-cover w-full h-[500px]"/>
        </div>

        <div className="flex items-center mb-8">
        <Link href={`/profile/${blog?.authorName}`}>

          <span className="text-black font-bold mr-2">{blog?.authorName}</span>
          </Link>
          <span className="text-gray-600">{formattedDate}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {blog?.tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="prose max-w-none mb-12">
          {blog?.content.split("\n\n").map((paragraph: string, index: number) => (
            <p key={index} className="mb-4 text-black">
              {paragraph}
            </p>
          ))}
        </div>
     
        <div className="mt-12">
        {blog && (
  <CommentSection blogId={id as string} />
)}
        </div>
      </div>
    </>
  );
};

export default StoryDetails;
