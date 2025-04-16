// "use client"
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { firestore } from '@/lib/firebase'; // تأكد من استيراد Firestore بشكل صحيح


// const BlogsPage: React.FC = () => {
//   const [blogs, setBlogs] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       const querySnapshot = await getDocs(collection(firestore, "blogs"));
//       const blogsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setBlogs(blogsData);
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className='pt-20'>
//       <h1>All Blogs</h1>
//       <div>
//         {blogs.map(blog => (
//           <div key={blog.id}>
//             <h2>{blog.title}</h2>
//             <p>{blog.content}</p>
//             <a href={`/blogs/${blog.id}`}>Read more</a> 
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogsPage;
