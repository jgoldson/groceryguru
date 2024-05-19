// app/recipes/page.js
import RecipeCard from "../../components/RecipeCard";
import recipes from "../../data/recipes.json";

const RecipesPage = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Recipes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  </div>
);

export default RecipesPage;
