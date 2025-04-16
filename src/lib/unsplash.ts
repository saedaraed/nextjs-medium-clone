import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
interface UnsplashImage {
  urls: {
    regular: string;
  };
}
export const fetchImages = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<string[]> => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
      },
    });

    // استخراج روابط الصور فقط
    const imageUrls = response.data.results.map((img: UnsplashImage) => img.urls.regular);

    return imageUrls;
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
};
