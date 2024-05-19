const RecipeCard = ({ recipe, servings, onRefresh }) => (
  <div className="border border-gray-200 rounded-lg p-4 shadow-md m-4 relative">
    <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
    <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
    <ul className="list-disc pl-5">
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index} className="mb-2">
          {ingredient.ingredient} ({ingredient[`${servings} Person`]} for{" "}
          {servings})
          {ingredient.Allergens && (
            <span className="text-red-600">
              {" "}
              - Allergens: {ingredient.Allergens}
            </span>
          )}
        </li>
      ))}
    </ul>
    <button
      onClick={onRefresh}
      className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
    >
      Swap
    </button>
  </div>
);

export default RecipeCard;
