"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [numRecipes, setNumRecipes] = useState(3);
  const [servings, setServings] = useState(2);

  const handleGetRecipes = () => {
    localStorage.removeItem("selectedRecipes");
    localStorage.removeItem("groceryList");
    router.push(`/recipes/${numRecipes}/${servings}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <div className="bg-white p-8 border-2 border-gray-200 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Welcome to Grocery Guru
        </h1>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Number of Recipes</label>
          <input
            type="number"
            value={numRecipes}
            onChange={(e) => setNumRecipes(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Number of Servings</label>
          <select
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </div>
        <button
          onClick={handleGetRecipes}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Get Recipes
        </button>
      </div>
    </div>
  );
};

export default HomePage;
