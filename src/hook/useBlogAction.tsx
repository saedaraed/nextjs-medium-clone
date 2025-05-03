import { useState } from 'react';
import { firestore } from '@/lib/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { Blog } from '@/types/types';

// Hook لإدارة التبديل والحذف
const useBlogActions = (initialSavedState: Record<string, boolean> = {}, setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>) => {
  const [saved, setSaved] = useState<Record<string, boolean>>(initialSavedState);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // وظيفة لحذف المدونة
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

  // وظيفة لتبديل حالة الحفظ
  const toggleSaved = (blogId: string) => {
    setSaved((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  // وظيفة للتبديل بين إظهار القائمة المنسدلة
  const toggleDropdown = (blogId: string) => {
    setOpenDropdown((prev) => (prev === blogId ? null : blogId));
  };

  return {
    saved,
    openDropdown,
    toggleSaved,
    toggleDropdown,
    handleDeleteBlog
  };
};

export default useBlogActions;
