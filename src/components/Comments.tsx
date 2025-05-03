"use client";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";
import {Comment} from '@/types/types'

const CommentSection = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
  console.log("comment", newComment);
  useEffect(() => {
    const commentRef = collection(firestore, "blogs", blogId, "comments");
    const unsubscribe = onSnapshot(commentRef, (snapshot) => {
      const allComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(
        allComments.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
      );
    });

    return () => unsubscribe();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentRef = collection(firestore, "blogs", blogId, "comments");

    await addDoc(commentRef, {
      content: newComment,
      createdAt: serverTimestamp(),
      userName: user?.displayName || "Anonymous",
      userPhoto: user?.photoURL || "/default-avatar.png",
    });

    setNewComment("");
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-black mb-6 custom-light">Comments</h2>

      {user && (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are you thoughts?"
            className="w-full p-3 border rounded-lg focus:outline-none min-h-[100px] text-sm mb-4"
          />

          <Button text="Post Comment" type="submit" variant="secondary" />
        </form>
      )}

      <div className="space-y-6">
        {comments?.map((comment: Comment) => {
          const formattedCommentDate = comment?.createdAt
            ?.toDate()
            ?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

          return (
            <div
              key={comment?.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <div className="flex justify-between">
                <div className="flex ">
                  <div className="mr-4 flex-shrink-0">
                    <img
                      src="https://public.readdy.ai/ai/img_res/dfa349a824891dfcee0b30fb924aa42c.jpg"
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className=" text-black">{comment?.userName}</h4>
                    <span className="text-gray-500 text-sm">
                      {formattedCommentDate}
                    </span>
                  </div>
                </div>
                <div><svg className="w-8 h-8 text-gray-800 dark:text-white font-bold" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
</svg>
</div>
              </div>

              <p className="text-black my-2">{comment?.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentSection;
