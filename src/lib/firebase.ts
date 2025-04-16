import { initializeApp } from "firebase/app";  //يستخدم لتفعيل وربط التطبيق بfirebase
import { getAuth } from "firebase/auth"; //تفعيل ميزة تسجيل الدخول (المصادقة)
import { getFirestore } from "firebase/firestore"; //ربط التطبيق بقاعدة بيانات (firestore) التي تعمل بشكل مباشر مع الوقت الحقيقي (real time)

// الحصول على إعدادات Firebase من ملف .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
//البادئة NEXT_PUBLIC_ تعني أن Next.js سيسمح باستخدام هذه المتغيرات على الواجهة الأمامية (Frontend).


// تهيئة تطبيق Firebase
const app = initializeApp(firebaseConfig); //يتم هنا ربط تطبيقك فعليًا بـ Firebase باستخدام الإعدادات التي وفّرتها.


 
// تهيئة خدمات Firebase
const auth = getAuth(app); //auth: تستخدم لتسجيل المستخدمين وتسجيل دخولهم وخروجهم.

  
const firestore = getFirestore(app); //firestore: قاعدة بيانات NoSQL يمكنك استخدامها لتخزين بيانات التطبيق.



export { auth, firestore };

//هو ملف إعداد Firebase يربط مشروعك بخدمات Firebase مثل المصادقة (Authentication) وقاعدة البيانات (Firestore) باستخدام بيانات الإعدادات المحفوظة في ملف البيئة .env.local.

