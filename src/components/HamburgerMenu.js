"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        className="text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <Link href="/" legacyBehavior>
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Home
            </a>
          </Link>
          <Link href="/recipes" legacyBehavior>
            <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Recipes
            </a>
          </Link>
          {user && (
            <Link href="/weekly-grocery-list" legacyBehavior>
              <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Weekly Grocery List
              </a>
            </Link>
          )}
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" legacyBehavior>
              <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Login
              </a>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
