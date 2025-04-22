"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchImages } from "../../lib/unsplash";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState<boolean>(false);

  const handleSearchUnsplash = async () => {
    if (!searchQuery.trim()) return;

    try {
      const fetched = await fetchImages(searchQuery);
      setUnsplashImages(fetched); // تأكدي إن الدالة fetchImages بترجع array of image URLs
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowGallery(false);
  };
  console.log("title", title);
  console.log("content", content);
  const router = useRouter();
  // const handleAddTag = () => {
  //   if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
  //     setTags([...tags, tagInput.trim()]);
  //     setTagInput("");
  //   }
  // };

  // const handleRemoveTag = (tagToRemove: string) => {
  //   setTags(tags.filter((tag) => tag !== tagToRemove));
  // };
  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleAddTag();
  //   }
  // };

  const imageParam = selectedImage
    ? `&selectedImage=${encodeURIComponent(selectedImage)}`
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill in both title and content.");
      return;
    }

    // إعادة التوجيه إلى صفحة التأكيد مع العنوان والمحتوى كـ query params
    router.push(
      `/confirm-story?title=${encodeURIComponent(
        title
      )}&content=${encodeURIComponent(content)}${imageParam}`
    );
  };
  // const formatOptions = [
  //   { icon: "fa-bold", title: "Bold" },
  //   { icon: "fa-italic", title: "Italic" },
  //   { icon: "fa-underline", title: "Underline" },
  //   { icon: "fa-heading", title: "Heading" },
  //   { icon: "fa-list-ul", title: "Bullet List" },
  //   { icon: "fa-list-ol", title: "Numbered List" },
  //   { icon: "fa-quote-right", title: "Quote" },
  // ];

  return (
    <div className="container w-[60%] mx-auto py-40 ">
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
        {/* featured image */}
        <div className="p-6 border-b border-[#687451]">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Featured Image
          </h2>

          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Featured"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowGallery(true)}
                className="mt-4 !rounded-button whitespace-nowrap cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i className="fas fa-exchange-alt mr-2"></i>
                Change Image
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="w-full h-64 border-2 border-dashed border-[#687451] rounded-lg flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
            >
              <div className="text-center flex items-center gap-2">
                <svg
                  className="w-10 h-10 text-[#3b0014] text-opacity-50 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path d="M464 448H48c-26.51 0-48-21.49-48-48V112C0 85.49 21.49 64 48 64h416c26.5 0 48 21.49 48 48v288c0 26.5-21.5 48-48 48zM464 112H48v66.75l96 96 96-96 224 224V112zM352 208c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" />
                </svg>
                <p className="text-[#3b0014]">Select an image from Unsplash</p>
              </div>
            </button>
          )}

          {/* Unsplash Gallery Modal */}
          {showGallery && (
            <div className="fixed inset-0 bg-[#687451] bg-opacity-[50%] flex items-center justify-center z-50 p-4">
              <div className="bg-[#f0e7c2] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-[#687451] flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#3b0014]">
                    Select an image from Unsplash
                  </h3>
                  <button
                    onClick={() => setShowGallery(false)}
                    className="text-[#3b0014] hover:text-[#3b0014] cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 352 512"
                    >
                      <path d="M242.72 256L345.37 153.37c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 73.37 86.63c-12.28-12.28-32.19-12.28-44.48 0L6.63 108.87c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 6.63 358.63c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.19 12.28 44.48 0L176 322.72l102.63 102.63c12.28 12.28 32.19 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                    </svg>{" "}
                  </button>
                </div>

                <div className="p-4 border-b border-[#687451]">
                  <div className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for images..."
                      className="flex-grow border border-[#687451] rounded-l-md px-4 py-2 focus:outline-none "
                    />
                    <button
                      type="button"
                      onClick={handleSearchUnsplash}
                      className="bg-[#3b0014] 600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 !rounded-button whitespace-nowrap cursor-pointer"
                    >
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5"
  fill="currentColor"
  viewBox="0 0 512 512"
>
  <path d="M505 442.7l-99.7-99.7C429.5 313.7 448 266.8 448 216 448 96.9 351.1 0 232 0S16 96.9 16 216s96.9 216 216 216c50.8 0 97.7-18.5 127-42.7l99.7 99.7c10 10 26.2 10 36.2 0l10.1-10.1c10-10 10-26.2 0-36.2zM232 368c-83.8 0-152-68.2-152-152S148.2 64 232 64s152 68.2 152 152-68.2 152-152 152z"/>
</svg>
                    </button>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {unsplashImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageSelect(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Unsplash ${index}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 
        <div className="px-6 py-3 border-b border-gray-200 flex flex-wrap gap-2">
          {formatOptions.map((option, index) => (
            <button
              key={index}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded !rounded-button whitespace-nowrap cursor-pointer"
              title={option.title}
              type="button"
            >
              <i className={`fas ${option.icon} text-black`}></i>
            </button>
          ))}
        </div> */}
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
            // disabled={submitting}
            className={`text-white bg-[#3b0014] ${
              !title || !content
                ? "bg-[#3b00147f] cursor-not-allowed"
                : "bg-[#3b0014] "
            } focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            {/* {submitting ? "Posting..." : "Post"} */}
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreatePost;
