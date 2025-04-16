import { useEffect, useState } from "react";
import { Blog } from "../types/types";
import {
  collection,
  getDocs,
  query,
  where,
  QueryConstraint,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface UseFetchBlogsProps {
  authorName?: string;
  category?: string;
}

const useFetchBlogs = ({ authorName, category }: UseFetchBlogsProps = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const constraints: QueryConstraint[] = [];

        if (authorName) {
          constraints.push(where("authorName", "==", authorName));
        }

        if (category) {
          constraints.push(where("category", "==", category));
        }

        const blogsQuery = constraints.length
          ? query(collection(firestore, "blogs"), ...constraints)
          : collection(firestore, "blogs");

        const querySnapshot = await getDocs(blogsQuery);
        const blogsData: Blog[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAtRaw = data.createdAt;

          return {
            id: doc.id,
            title: data.title || "No Title",
            content: data.content || "No Content",
            image: data.image || "no image",
            authorName: data.authorName || "Unknown Author",
            category: data.category || "",
            createdAt: createdAtRaw?.toDate?.()||new Date(),

          };
        });

        setBlogs(blogsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [authorName, category]);

  return { blogs, loading, error };
};

export default useFetchBlogs;
