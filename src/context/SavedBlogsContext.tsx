"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Blog } from "@/types/types"; // Adjust this path if needed

// 1. Define context type
interface SavedBlogsContextType {
  savedBlogs: Blog[];
  saveBlog: (blog: Blog) => void;
  unsaveBlog: (blogId: string) => void;
  isSaved: (blogId: string) => boolean;
}

// 2. Create context
const SavedBlogsContext = createContext<SavedBlogsContextType | undefined>(undefined);

// 3. Create Provider
export const SavedBlogsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedBlogs, setSavedBlogs] = useState<Blog[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("savedBlogs");
    if (stored) {
      setSavedBlogs(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
  }, [savedBlogs]);

  const saveBlog = (blog: Blog) => {
    if (!savedBlogs.find((b) => b.id === blog.id)) {
      setSavedBlogs((prev) => [...prev, blog]);
    }
  };

  const unsaveBlog = (blogId: string) => {
    setSavedBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  const isSaved = (blogId: string) => {
    return savedBlogs.some((b) => b.id === blogId);
  };

  return (
    <SavedBlogsContext.Provider value={{ savedBlogs, saveBlog, unsaveBlog, isSaved }}>
      {children}
    </SavedBlogsContext.Provider>
  );
};

// 4. Custom hook to use the context
export const useSavedBlogs = () => {
  const context = useContext(SavedBlogsContext);
  if (!context) {
    throw new Error("useSavedBlogs must be used within a SavedBlogsProvider");
  }
  return context;
};
