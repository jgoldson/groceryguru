"use client"; // This marks the component as a Client Component

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const [numRecipes, setNumRecipes] = useState(1);
  const [servings, setServings] = useState(2);
  const [hasFinalizedList, setHasFinalizedList] = useState(false);

  useEffect(() => {
    const finalizedRecipes = localStorage.getItem("finalizedRecipes");
    const finalizedGroceryList = localStorage.getItem("finalizedGroceryList");
    if (finalizedRecipes && finalizedGroceryList) {
      setHasFinalizedList(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/recipes/${numRecipes}/${servings}`);
  };

  const handleViewFinalizedList = () => {
    router.push("/weekly-grocery-list");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Welcome to Grocery Guru
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-semibold">
              Number of Recipes
            </label>
            <input
              type="number"
              value={numRecipes}
              onChange={(e) => setNumRecipes(e.target.value)}
              min="1"
              max="10"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-semibold">
              Number of Servings
            </label>
            <select
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2">2</option>
              <option value="4">4</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Get Recipes
          </button>
        </form>
        {hasFinalizedList && (
          <button
            onClick={handleViewFinalizedList}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 mt-4"
          >
            View Latest Recipes and Grocery List
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
