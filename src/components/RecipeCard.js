import React from "react";

const RecipeCard = ({
  recipe,
  servings,
  onRefresh,
  isRecipeDirectory,
  onSelectRecipe,
}) => {
  const recipePath = recipe.recipeLink;

  return (
    <div className="relative bg-white p-6 border rounded-lg shadow-md">
      {!isRecipeDirectory && (
        <div>
          <div className="absolute top-2 right-2 flex space-x-2 z-10">
            <button
              onClick={onRefresh}
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 flex items-center justify-center"
              aria-label="Refresh"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-2 right-2 flex space-x-2 z-10">
            <button
              onClick={onSelectRecipe}
              className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
            >
              Select
            </button>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 mr-12 pr-4">{recipe.name}</h2>
      <h3 className="text-lg font-semibold">
        {isRecipeDirectory ? `Ingredients:` : `Ingredients for ${servings}:`}
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
