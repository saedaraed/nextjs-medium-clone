// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   startAt,
//   endAt,
// } from "firebase/firestore";
// import { firestore } from "@/lib/firebase";
// import { Blog } from "@/types/types";

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const queryTerm = searchParams.get("q") || "";
//   const [results, setResults] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchResults = async () => {
//       if (!queryTerm.trim()) return;

//       setLoading(true);
//       try {
//         const blogsRef = collection(firestore, "blogs");
//         const q = query(
//           blogsRef,
//           orderBy("title"),
//           startAt(queryTerm),
//           endAt(queryTerm + "\uf8ff")
//         );

//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setResults(data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, [queryTerm]);

//   return (
//     <div className="max-w-2xl mx-auto py-8">
//       <h1 className="text-xl font-bold mb-4">
//         Results for: <span className="text-blue-600">{queryTerm}</span>
//       </h1>

//       {loading ? (
//         <p className="text-sm text-gray-500">Searching...</p>
//       ) : results.length > 0 ? (
//         <ul className="space-y-3">
//           {results.map((blog) => (
//             <li key={blog.id} className="p-3 border rounded shadow-sm">
//               <h2 className="text-lg font-semibold">{blog.title}</h2>
//               {/* Add more blog details if needed */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No results found.</p>
//       )}
//     </div>
//   );
// };

// export default SearchPage;
