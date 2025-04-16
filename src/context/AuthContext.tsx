"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, loginWithEmail, loginWithGoogle, logout, registerWithEmail } from "../lib/auth";
import { User } from "firebase/auth";
import { firestore } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Cookies from "js-cookie";

//createContext: لإنشاء سياق (context) يُشارك الحالة بين المكونات.
//useContext: لاستخدام السياق في المكونات.
//useState: لحفظ حالة المستخدم/loading/errors.
//useEffect: لتحديث الحالة عند تغيّر شيء (مثل التحقق من تسجيل الدخول).
//نوع User لتحديد نوع المستخدم.



// إنشاء السياق
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string , bio:string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); //ننشئ السياق بحيث يمكننا استخدامه لاحقًا في أي مكوّن للوصول للمستخدم الحالي أو تسجيل الدخول والخروج بسهولة.



// هوك للوصول إلى السياق
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


// دالة لجلب بيانات المستخدم من Firestore
//لما يسجّل المستخدم أو يدخل، نروح نجيب بياناته الإضافية مثل username.


const fetchUserData = async (uid: string) => {
  
  const userDoc = await getDoc(doc(firestore, "users", uid));
  if (userDoc.exists()) {
    console.log("User data fetched:", userDoc.data());
    return userDoc.data();
  }
  
  return null;
};

// موفر السياق
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //مكوّن يغلّف كل التطبيق أو جزء منه ليتيح للمكونات اللي بداخله الوصول لحالة المستخدم.


  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //🔁 useEffect لمزامنة المستخدم:

    // جلب المستخدم من الكوكيز عند تحميل الصفحة
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      //نستخدم onAuthStateChanged من Firebase لمراقبة تسجيل الدخول أو الخروج.
//إذا كان فيه مستخدم، نجيب بياناته من Firestore ونخزنها.


      if (user) {
        const userData = await fetchUserData(user.uid);
        const fullUser = { ...user, ...userData };
        setUser(fullUser);
        Cookies.set("user", JSON.stringify(fullUser), { expires: 7, path: "/" });
      } else {
        setUser(null);
        Cookies.remove("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // تسجيل مستخدم جديد
  const register = async (username: string, email: string, password: string, bio: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await registerWithEmail(username, email, password , bio);
      if (user) {
        setUser(user);
        Cookies.set("user", JSON.stringify(user), { expires: 7 , path:"/" });
      }
    } catch (err) {
      setError("Failed to register user");
      console.error("Error registering:", err);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الدخول بالبريد الإلكتروني
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithEmail(email, password);
      if (user) {
        // const userData = await fetchUserData(user.uid);
        // const fullUser = { ...user, ...userData };
        // setUser(fullUser);
        setUser(user);

        Cookies.set("user", JSON.stringify(user), { expires: 7 , path: "/" , secure: true});
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error("Error logging in:", err);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الدخول باستخدام Google
  const loginWithGoogleHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginWithGoogle();
      if (user) {
        const userData = await fetchUserData(user.uid);
        const fullUser = { ...user, ...userData };
        setUser(fullUser);
        Cookies.set("user", JSON.stringify(fullUser), { expires: 7, path: "/" });
      }
    } catch (err) {
      setError("Failed to log in with Google");
      console.error("Error logging in with Google:", err);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج
  const logoutHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      await logout();
      setUser(null);
      Cookies.remove("user");
    } catch (err) {
      setError("Failed to log out");
      console.error("Error logging out:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, register, login, loginWithGoogle: loginWithGoogleHandler, logout: logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};
