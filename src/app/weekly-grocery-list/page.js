"use client"; // This marks the component as a Client Component

import { useEffect, useState } from "react";

const WeeklyGroceryListPage = () => {
  const [groceryList, setGroceryList] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [servings, setServings] = useState(2); // Default to 2 servings

  useEffect(() => {
    const storedRecipes = localStorage.getItem("finalizedRecipes");
    const storedList = localStorage.getItem("finalizedGroceryList");
    if (storedRecipes && storedList) {
      setRecipes(JSON.parse(storedRecipes));
      setGroceryList(JSON.parse(storedList));
    }
  }, []);

  const handleDownload = () => {
    const currentDate = new Date().toLocaleDateString();
    const title = `Grocery List - ${currentDate}`;
    const listText = Object.entries(groceryList)
      .map(([ingredient, info]) => `${ingredient}: ${info.quantity}`)
      .join("\n");

    const fullText = `${title}\n\n${listText}`;

    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `grocery_list_${currentDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Weekly Grocery List
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Meals</h2>
          <ul className="list-disc pl-5 space-y-2">
            {recipes.map((recipe, index) => (
              <li key={index} className="text-lg text-gray-700">
                {recipe.name} - {servings} Servings
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Grocery List
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            {Object.entries(groceryList).map(([ingredient, info], index) => (
              <li key={index} className="text-lg text-gray-700">
                {ingredient}: {info.quantity}
                {info.allergens && (
                  <span className="text-red-600">
                    {" "}
                    - Allergens: {info.allergens}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 mt-6"
        >
          Download Grocery List
        </button>
      </div>
    </div>
  );
};

export default WeeklyGroceryListPage;
