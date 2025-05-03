//الهدف من هذا الملف هو إنشاء هُوك مخصص في React يسمى useFetchBlogs والذي يقوم بتحميل واسترجاع المقالات (blogs) من قاعدة بيانات Firestore في Firebase بناءً على بعض المعايير مثل اسم المؤلف (authorName) أو التصنيف (category).

import { useEffect, useState } from "react";
import { Blog } from "../types/types";
import {
  collection,
  getDocs,
  query,
  where,
  QueryConstraint,
//   QueryConstraint هو نوع يُستخدم في Firebase Firestore لتمثيل قيود الاستعلام (Query Constraints) التي تُضاف إلى استعلامات قاعدة البيانات.

// عند إجراء استعلام في Firestore، يمكنك إضافة قيود لتصفية النتائج وفقًا لمعايير معينة (مثل تصنيف المقالات، أو اسم المؤلف). وهذه القيود تُستخدم لتحديد كيفية جلب البيانات من Firestore.
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface UseFetchBlogsProps {
  authorName?: string;
  category?: string;
}
// UseFetchBlogsProps: هي واجهة (interface) تحدد الخصائص التي يمكن أن تُمرر إلى هُوك useFetchBlogs. الخصائص الاختيارية هي:

// authorName: اسم المؤلف.

// category: تصنيف المقالات.
const useFetchBlogs = ({ authorName, category }: UseFetchBlogsProps = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


//   useEffect: هُوك يستخدم لجلب البيانات عند تحميل المكون أو عندما يتغير authorName أو category.

// fetchBlogs: دالة غير متزامنة (async) لتحميل المقالات من Firestore.
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const constraints: QueryConstraint[] = [];
        //  إضافة شروط (Constraints) للاختيار:
        
        
        if (authorName) {
          constraints.push(where("authorName", "==", authorName));
        }
// إذا تم توفير authorName أو category، تتم إضافة شروط where إلى استعلام Firebase للبحث في قاعدة البيانات حسب هذه القيم.


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
// إذا كانت هناك شروط (constraints)، فإننا ننشئ استعلامًا مع تلك الشروط باستخدام query و where. إذا لم تكن هناك شروط، ببساطة نقوم بجلب جميع المدونات من مجموعة blogs.
// getDocs: تستخدم لجلب المستندات التي تطابق الاستعلام.

// querySnapshot.docs.map: يقوم بتحويل المستندات التي تم جلبها إلى بيانات قابلة للاستخدام.

// data.createdAt: إذا كانت القيمة createdAt موجودة، يتم تحويلها من Timestamp إلى Date باستخدام toDate(). إذا لم تكن موجودة، يتم تعيين التاريخ الحالي كبديل 
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

  return { blogs, loading, error , setBlogs };
};

export default useFetchBlogs;
