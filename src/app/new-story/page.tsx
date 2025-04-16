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
    <div className="container w-[60%] mx-auto pt-20 ">
      <h1 className="text-[30px]">Create new blog</h1>
      <form action="" onSubmit={handleSubmit}>
        <div className="p-6 border-b border-gray-200">
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
        <div className="p-6 border-b border-gray-200">
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
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
            >
              <div className="text-center">
                <i className="fas fa-image text-4xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">Select an image from Unsplash</p>
              </div>
            </button>
          )}

          {/* Unsplash Gallery Modal */}
          {showGallery && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Select an image from Unsplash
                  </h3>
                  <button
                    onClick={() => setShowGallery(false)}
                    className="text-gray-400 hover:text-gray-500 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <div className="p-4 border-b border-gray-200">
                  <div className="flex">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for images..."
                      className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleSearchUnsplash}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fas fa-search"></i>
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
            className={`text-black bg-[#bd88c9] ${!title || !content ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
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
