import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Avatar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout , user } = useAuth();
const router =useRouter()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      await logout(); // Perform logout
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const firstCharOfName = user?.displayName ? user.displayName.charAt(0).toUpperCase() : '';

  return (
    <div className="relative">
      {/* Avatar Image */}
     <button 
        id="avatarButton" 
        onClick={toggleDropdown} 
        className="w-10 h-10 rounded-full cursor-pointer"
      >
       {user?.photoURL?(<Image 
          src="/docs/images/people/profile-picture-5.jpg" 
          alt="User dropdown" 
          width={40} 
          height={40}
          className="rounded-full"
        />
):(<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300">{firstCharOfName}</span>
</div>)}  
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          id="dropdownDivider" 
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute mt-2 right-0 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
            <li className='px-4 py-2 font-bold'>{user?.displayName}</li>
            <li>
            <Link href={`/profile/${user?.displayName}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Profile
              </Link>
            </li>
            <li>
            <Link href={`/`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Library
              </Link>
            </li>
            <li>
            <Link     href={`/stories/${user?.displayName}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Stories
              </Link>
            </li>
          </ul>
          <div className="py-2">
            <Link href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
