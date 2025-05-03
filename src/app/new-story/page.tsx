"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageSelector from "@/components/ImageSelector";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const router = useRouter();


  const imageParam = selectedImage
    ? `&selectedImage=${encodeURIComponent(selectedImage)}`
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    router.push(
      `/confirm-story?title=${encodeURIComponent(
        title
      )}&content=${encodeURIComponent(content)}${imageParam}`
    );
  };


  return (
    <div className="container w-[90%] md:w-[60%] mx-auto py-30 ">
      <h1 className="text-[30px] text-[#3b0014] font-bold">Create new blog</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="p-6 border-b border-[#687451]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your story title..."
            className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0"
          />
          <div className="text-sm text-gray-500 mt-2">
            {title.length} characters{" "}
            {title.length > 100 && "(recommended: less than 100)"}
          </div>
        </div>
 
                 <div className="p-6 border-b border-[#687451]">
          <ImageSelector selectedImage={selectedImage} onImageSelect={setSelectedImage} />
        </div>
        <div className="p-6 border-b border-gray-200">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your story..."
            className="w-full h-64 border-none focus:outline-none focus:ring-0 resize-none"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className={`text-white bg-[#3b0014] mt-4 ${
              !title || !content
                ? "bg-[#3b00147f]  cursor-not-allowed"
                : "bg-[#3b0014] custom-light-bg custom-dark "
            } focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >            Publish
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
