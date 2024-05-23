import React from "react";

const RecipeCard = ({ recipe, servings, onRefresh }) => {
  const recipePath = recipe.recipeLink;

  return (
    <div className="relative bg-white p-6 border rounded-lg shadow-md">
      <button
        onClick={onRefresh}
        className="absolute top-2 right-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
      >
        Swap
      </button>
      <h2 className="text-2xl font-bold mb-4 mr-4 pr-4">{recipe.name}</h2>
      <h3 className="text-lg font-semibold">
        Ingredients for {servings} Person(s):
      </h3>
      <ul className="mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.ingredient}: {ingredient[`${servings} Person`]}
            {ingredient.Allergens && (
              <span className="text-red-600">
                {" "}
                (Allergens: {ingredient.Allergens})
              </span>
            )}
          </li>
        ))}
      </ul>
      <a
        href={recipePath}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 left-2 text-blue-500 hover:underline"
      >
        Recipe
      </a>
    </div>
  );
};

export default RecipeCard;
