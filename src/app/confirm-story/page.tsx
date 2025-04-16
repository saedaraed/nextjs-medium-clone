"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Toast from "@/components/Toast";

const ConfirmPost: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "";
  const content = searchParams.get("content") || "";
  const image = searchParams.get("selectedImage") || "";
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);


  
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  const customId = `${user?.uid}-${Date.now()}`; 
  const handleConfirmPublish = async () => {
    setSubmitting(true);
    try {
      await setDoc(doc(firestore, "blogs", customId), {
        id: customId,
        title,
        content,
        createdAt: serverTimestamp(),
        authorId: user?.uid,
        authorName: user?.displayName || "Anonymous",
        tags: tags.length > 0 ? tags : [],
        category, 
        ...(image && { image }),
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push(`/blogs/${customId}`);
      }, 3000);
    } catch (err) {
      console.error("Error adding document:", err);
      setShowToast(true); // عرض التوست عند الخطأ
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/new-story");
  };

  if (!title || !content) {
    return <p>Error: Missing required data!</p>;
  }


  return (
    <div className="container w-[60%] mx-auto pt-40">
      <div className="flex justify-end mb-4">
        <button onClick={handleCancel} className="">
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>{" "}
      </div>

      <div className=" flex gap-8">
        <div className="w-[50%] mx-auto">
          <h1 className="text-xl font-bold mb-6">Story Preview</h1>
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="blog image"
                className="w-full h-[170px] object-cover rounded"
              />
            </div>
          )}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mt-4 mb-2">{title}</h2>
            <hr className="border-gray-300"/>
            <p className="mt-4 mb-2">{content}</p>
            <hr className="border-gray-300"/>
            <div className="mt-4 mb-2">
              {tags?.map((tag) => (
                <p key={tag}>{tag}</p>
              ))}
            </div>
            <hr className="border-gray-300"/>

            <p className="mt-2 text-sm text-gray-600">Category: <span className="font-medium font-bold">{category}</span></p>

          </div>
          {showToast && <Toast />}
        </div>
        <div className="w-[50%] mx-auto">
          <h2 className="flex gap-1">
            Publishing To: <p className="font-bold">{user?.displayName}</p>
          </h2>
          <div className="p-6 border-b border-gray-200">
          <div className="mb-6">
  <label
    htmlFor="category"
    className="block text-sm font-medium text-gray-700 mb-2"
  >
    Select a category
  </label>
  <select
    id="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
  >
        <option selected className=" text-gray-700">  Select a category</option>

    <option value="technology">Technology</option>
    <option value="lifestyle">Lifestyle</option>
    <option value="travel">Travel</option>
    <option value="food">Food</option>
    <option value="entertainment">Entertainment</option>
  </select>
</div>

            <div className="mb-6">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Add or change topics (up to 5) so readers know what your story
                is about
              </label>

              <div className="flex">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a topic..."
                  className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300 focus:outline-none"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 my-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span >
                      {tag}
                    </span>
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      <svg
                        className="w-2 h-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>{" "}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <button
                onClick={handleConfirmPublish}
                disabled={submitting}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {submitting ? "Publishing..." : "Publish Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPost;
