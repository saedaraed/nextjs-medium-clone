"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Avatar from "./Avatar";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}   role="navigation"
      aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 pt-4 pb-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-[#3b0014]" style={{ fontFamily: "'Pacifico', cursive" }}>Free Pen</h1>
              {user && <Link href="/">Home</Link>}
              {user && <SearchBar />}
              
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    href="/new-story"
                    className="flex items-center gap-2 border-b border-[#3B0014] py-1 w-fit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L8.25 18.75H4.5v-3.75L16.862 4.487z"
                      />
                    </svg>{" "}
                    <p className="text-[#3B0014]">create story</p>
                  </Link>

                  <Avatar />
                </>
              ) : (
                <>
                  {/* <Link
                    href="/login"
                    className="text-white bg-[#bd88c9] py-2 px-4 rounded-md inline-block"
                  >
                    Log In
                  </Link> */}
                </>
              )}
            </div>
          </div>

          {!isScrolled &&  user &&<hr />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
