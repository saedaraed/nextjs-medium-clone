"use client";
import { useState } from "react";

interface ImageSelectorProps {
  selectedImage: string | null;
  onImageSelect: (imageUrl: string) => void;
}

import { fetchImages } from "@/lib/unsplash";

const ImageSelector: React.FC<ImageSelectorProps> = ({ selectedImage, onImageSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [unsplashImages, setUnsplashImages] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);

  const handleSearchUnsplash = async () => {
    if (!searchQuery.trim()) return;
    try {
      const fetched = await fetchImages(searchQuery);
      setUnsplashImages(fetched);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4 custom-light">Choose Image</h2>

      {selectedImage ? (
        <div className="relative">
          <img src={selectedImage} alt="Featured" className="w-full h-64 object-cover rounded-lg" />
          <button
            type="button"
            onClick={() => setShowGallery(true)}
            className="mt-4 px-4 py-2 border border-gray-300 shadow-sm text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Change Image
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowGallery(true)}
          className="w-full h-64 border-2 border-dashed border-[#687451] rounded-lg flex flex-col items-center justify-center  cursor-pointer"
        >

                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
          <p className="text-[#3b0014] font-semibold custom-light">Select an image from Unsplash</p>
        </button>
      )}

      {showGallery && (
        <div className="fixed inset-0 bg-[#687451] bg-opacity-[50%] flex items-center justify-center z-50 p-4">
          <div className="bg-[#f0e7c2] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[#687451] flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#3b0014]">Select an image</h3>
              <button onClick={() => setShowGallery(false)} className="text-[#3b0014] cursor-pointer">
                ✖
              </button>
            </div>

            <div className="p-4 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images..."
                className="flex-grow border border-[#687451] rounded-l-md px-4 py-2"
              />
              <button
                type="button"
                onClick={handleSearchUnsplash}
                className="bg-[#3b0014] text-white px-4 py-2 rounded-r-md"
              >
                Search
              </button>
            </div>

            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              {unsplashImages.map((url, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:opacity-90"
                  onClick={() => {
                    onImageSelect(url);
                    setShowGallery(false);
                  }}
                >
                  <img src={url} alt={`Unsplash ${index}`} className="w-full h-40 object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
