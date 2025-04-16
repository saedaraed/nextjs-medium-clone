// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { firestore } from "../lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const useUserStatus = (username: string | undefined) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [isOwner, setIsOwner] = useState<boolean>(false);
//   const [user, setUser] = useState<any | null>(null);

//   useEffect(() => {
//     const cookieUser = Cookies.get("user");
//     const parsedUser = cookieUser ? JSON.parse(cookieUser) : null;
//     if (parsedUser) {
//       setIsLoggedIn(true);
//       if (username && parsedUser.displayName === username) {
//         setIsOwner(true);
//       }
//     }

//     if (username) {
//       const fetchUserData = async () => {
//         const q = query(
//           collection(firestore, "users"),
//           where("username", "==", username)
//         );
//         const querySnapshot = await getDocs(q);

//         if (!querySnapshot.empty) {
//           const userData = querySnapshot.docs[0].data();
//           setUser(userData);
//         } else {
//           console.log("No user found with that username!");
//         }
//       };
//       fetchUserData();
//     }
//   }, [username]);

//   return { isLoggedIn, isOwner, user };
// };

// export default useUserStatus;
