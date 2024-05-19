"use client"; // This marks the component as a Client Component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecipeCard from "../../../../components/RecipeCard";
import recipes from "../../../../data/recipes.json";

const getRandomRecipes = (num, exclude = []) => {
  const availableRecipes = recipes.filter(
    (recipe) => !exclude.includes(recipe.name)
  );
  const shuffled = availableRecipes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

// Helper function to add quantities correctly
const addQuantities = (existingQuantity, newQuantity) => {
  existingQuantity = existingQuantity.toString();
  newQuantity = newQuantity.toString();

  if (!existingQuantity) return newQuantity;
  const existingParts = existingQuantity.split(" ");
  const newParts = newQuantity.split(" ");

  if (
    existingParts.length === 2 &&
    newParts.length === 2 &&
    existingParts[1] === newParts[1]
  ) {
    const totalQuantity =
      parseFloat(existingParts[0]) + parseFloat(newParts[0]);
    return `${totalQuantity} ${existingParts[1]}`;
  }

  if (existingParts.length === 1 && newParts.length === 1) {
    const totalQuantity =
      parseFloat(existingParts[0]) + parseFloat(newParts[0]);
    return `${totalQuantity}`;
  }

  return `${existingQuantity} + ${newQuantity}`;
};

const calculateGroceryList = (selectedRecipes, servings) => {
  const groceryList = {};

  selectedRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const quantity = ingredient[`${servings} Person`];
      if (groceryList[ingredient.ingredient]) {
        groceryList[ingredient.ingredient].quantity = addQuantities(
          groceryList[ingredient.ingredient].quantity,
          quantity
        );
      } else {
        groceryList[ingredient.ingredient] = {
          quantity,
          allergens: ingredient.Allergens,
          checked: true, // Ensure checked status is true by default
        };
      }
    });
  });

  return groceryList;
};

const RecipesPage = ({ params }) => {
  const { numRecipes, servings } = params;
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState({});
  const router = useRouter();

  useEffect(() => {
    const num = parseInt(numRecipes, 10);
    const randomRecipes = getRandomRecipes(num);
    setSelectedRecipes(randomRecipes);
    const calculatedGroceryList = calculateGroceryList(randomRecipes, servings);
    setGroceryList(calculatedGroceryList);
  }, [numRecipes, servings]);

  const handleCheckboxChange = (ingredient) => {
    setGroceryList((prevGroceryList) => ({
      ...prevGroceryList,
      [ingredient]: {
        ...prevGroceryList[ingredient],
        checked: !prevGroceryList[ingredient].checked,
      },
    }));
  };

  const handleRefreshRecipe = (index) => {
    const exclude = selectedRecipes.map((recipe) => recipe.name);
    const newRecipe = getRandomRecipes(1, exclude)[0];

    const newSelectedRecipes = [...selectedRecipes];
    newSelectedRecipes[index] = newRecipe;
    setSelectedRecipes(newSelectedRecipes);

    const calculatedGroceryList = calculateGroceryList(
      newSelectedRecipes,
      servings
    );
    setGroceryList(calculatedGroceryList);
  };

  const handleFinalizeList = () => {
    const finalizedList = Object.entries(groceryList)
      .filter(([_, info]) => info.checked)
      .reduce((acc, [ingredient, info]) => {
        acc[ingredient] = info;
        return acc;
      }, {});

    // Save the finalized recipes and grocery list to local storage
    localStorage.setItem("finalizedRecipes", JSON.stringify(selectedRecipes));
    localStorage.setItem("finalizedGroceryList", JSON.stringify(finalizedList));

    // Navigate to the weekly grocery list page
    router.push("/weekly-grocery-list");
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 border-2 border-gray-200 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Selected Recipes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              servings={servings}
              onRefresh={() => handleRefreshRecipe(index)}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">Grocery List</h2>
        <ul className="list-disc pl-5">
          {Object.entries(groceryList).map(([ingredient, info], index) => (
            <li key={index} className="mb-2 flex items-center">
              <input
                type="checkbox"
                checked={info.checked}
                onChange={() => handleCheckboxChange(ingredient)}
                className="mr-2"
              />
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
        <button
          onClick={handleFinalizeList}
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Finalize List
        </button>
      </div>
    </div>
  );
};

export default RecipesPage;
