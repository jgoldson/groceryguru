import React from "react";

const RecipeModal = ({ recipes, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 border rounded-lg shadow-lg w-3/4 max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Select a Recipe</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-600"
        >
          Close
        </button>
        <ul className="list-disc pl-5 max-h-96 overflow-y-auto">
          {recipes.map((recipe, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => onSelect(recipe)}
                className="text-blue-500 hover:underline"
              >
                {recipe.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeModal;
