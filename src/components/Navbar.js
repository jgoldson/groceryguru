"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
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
    <nav className="bg-blue-600 bg-opacity-80 border-2 border-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white font-bold text-xl">Grocery Guru</a>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/recipes" legacyBehavior>
            <a className="text-white">Recipes</a>
          </Link>
          {user && (
            <Link href="/weekly-grocery-list" legacyBehavior>
              <a className="text-white">Weekly Grocery List</a>
            </Link>
          )}
          {user ? (
            <>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" legacyBehavior>
              <a className="text-white">Login</a>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
