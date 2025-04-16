import { auth , firestore } from './firebase'; //استخدمنا auth لاجراء عمليات تسجيل الدخول والخروج / firestore لحفظ بيانات المستخدمي في قاعدة البيانات
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; //doc:لإنشاء مرجع (reference) لمستند داخل Firestore. / setDoc: لحفظ البيانات داخل هذا المستند.

// التسجيل باستخدام البريد الإلكتروني وكلمة المرور

//دالة اسمها registerWithEmail، تأخذ username, email, password.
//ترجع User (إذا تم التسجيل بنجاح)، أو null.

/* -------------------- Helpers -------------------- */

const updateDisplayName = async (user: User, username: string) => {
  try {
    await updateProfile(user, { displayName: username });
    console.log("Display name updated successfully!");
  } catch (error) {
    console.error("Error updating display name:", error);
  }
};
const saveUserData = async (user: User, username: string, email: string , bio:string) => {
  try {
    await setDoc(doc(firestore, 'users', user.uid), {
      username: username,
      email: email,
      bio: bio,
      createdAt: new Date(),
    });
    console.log('User data saved successfully!');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
/* -------------------- Auth Functions -------------------- */


export const registerWithEmail = async (username: string, email: string, password: string ,bio:string): Promise<User | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
//تنشئ مستخدم جديد باستخدام Firebase Authentication.
//إذا نجح، نحصل على كائن المستخدم (user).


 
//نحفظ بيانات المستخدم (الاسم، الإيميل، وقت الإنشاء) في Firestore.
//المستند يتم تخزينه تحت مجموعة users ومعرّفه هو user.uid.
await updateDisplayName(user, username);
await saveUserData(user, username, email, bio);

    return user; //نرجع كائن المستخدم بعد التسجيل.


  } catch (error) {
    console.error("Error registering:", error);
    throw new Error("Error registering user.");
  }
};

// تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور
export const loginWithEmail = async (email: string, password: string): Promise<User | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Error logging in.");
  }
};

export const loginWithGoogle = async (): Promise<User | null> => {
    const provider = new GoogleAuthProvider();
    //ننشئ مزود Google لتسجيل الدخول.

    try {
      const result = await signInWithPopup(auth, provider);
      //يفتح نافذة تسجيل دخول Google.
//إذا نجح، يرجع المستخدم.


      const user = result.user;
      console.log("Google login successful", user);
      return user;
    } catch (error) {
      console.error("Error with Google login:", error);
      throw new Error("Error with Google login.");
    }
  };
// تسجيل الخروج
export const logout = async () => {
  //الدالة logout لتسجيل الخروج.


  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export { auth };
