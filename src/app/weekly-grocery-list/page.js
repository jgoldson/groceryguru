"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";

const WeeklyGroceryListPage = () => {
  const [finalizedGroceryList, setFinalizedGroceryList] = useState({});
  const [finalizedRecipes, setFinalizedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = doc(db, "users", user.uid);
        const groceryListsCollection = collection(userDoc, "GroceryLists");
        const q = query(
          groceryListsCollection,
          orderBy("date", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const latestListDoc = querySnapshot.docs[0];
          const latestListData = latestListDoc.data();
          setFinalizedRecipes(latestListData.recipes);

          const groceryListCollection = collection(
            latestListDoc.ref,
            "groceryList"
          );
          const groceryListSnapshot = await getDocs(groceryListCollection);
          const groceryList = {};
          groceryListSnapshot.forEach((doc) => {
            groceryList[doc.id] = doc.data();
          });
          setFinalizedGroceryList(groceryList);
        }

        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleDownload = () => {
    const date = new Date().toLocaleDateString();
    const filename = `Grocery List - ${date}.txt`;
    let content = `Grocery List - ${date}\n\nMeals:\n`;

    finalizedRecipes.forEach((recipe) => {
      content += `- ${recipe.name} (${recipe.servings} servings)\n`;
    });

    content += `\nGrocery List:\n`;
    Object.entries(finalizedGroceryList).forEach(([ingredient, info]) => {
      content += `- ${ingredient}: ${info.quantity}`;
      if (info.allergens) {
        content += ` (Allergens: ${info.allergens})`;
      }
      content += `\n`;
    });

    // Check if the device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Open the text content in a new tab on mobile
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const newTab = window.open();
      newTab.document.write(`<pre>${content}</pre>`);
      newTab.document.close();
    } else {
      // Download the file on desktop
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-8">
        <div className="bg-white p-8 border-2 border-gray-200 rounded-lg shadow-lg max-w-5xl w-full">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Weekly Grocery List
          </h1>
          <h2 className="text-2xl font-bold mt-8 mb-4">Meals</h2>
          <ul className="list-disc pl-5">
            {finalizedRecipes.map((recipe, index) => (
              <li key={index} className="mb-2">
                <a
                  href={recipe.recipeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {recipe.name}
                </a>{" "}
                - {recipe.servings} servings
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Grocery List</h2>
          <ul className="list-disc pl-5">
            {Object.entries(finalizedGroceryList).map(
              ([ingredient, info], index) => (
                <li key={index} className="mb-2">
                  {ingredient}: {info.quantity}
                  {info.allergens && (
                    <span className="text-red-600">
                      {" "}
                      - Allergens: {info.allergens}
                    </span>
                  )}
                </li>
              )
            )}
          </ul>
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Download List
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default WeeklyGroceryListPage;
