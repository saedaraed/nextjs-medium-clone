"use client";
import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Timestamp } from "firebase/firestore";

interface Comment {
  id: string;
  content: string;
  createdAt: Timestamp;
  userName: string;
  userPhoto?: string;
}

const CommentSection = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();
console.log('comment' , newComment)
  useEffect(() => {
    const commentRef = collection(firestore, "blogs", blogId, "comments");
    const unsubscribe = onSnapshot(commentRef, (snapshot) => {
      const allComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(allComments.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
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
      <h2 className="text-2xl font-bold text-black mb-6">Comments</h2>

      {user && (
        <form onSubmit={handleSubmit} className="mb-10">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] text-sm mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-button hover:bg-blue-700 transition duration-200"
          >
            Post Comment
          </button>
        </form>
      )}

<div className="space-y-6">
  {comments?.map((comment: Comment) => {
    const formattedCommentDate = comment?.createdAt?.toDate()?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div
        key={comment?.id}
        className="flex p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
      >
        <div className="mr-4 flex-shrink-0">
          <img
              src={comment.userPhoto}
              alt={comment.userName}
            className="w-12 h-12 rounded-full object-cover object-top"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-black">{comment?.userName}</h4>
          <p className="text-black my-2">{comment?.content}</p>
          <span className="text-gray-500 text-sm">{formattedCommentDate}</span>
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
};

export default CommentSection;
