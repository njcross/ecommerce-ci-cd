// src/RecipeApp.jsx
import React, { useState } from 'react';

// Sample list of recipes
const recipes = [
  { id: 1, name: 'Spaghetti Carbonara' },
  { id: 2, name: 'Chicken Tikka Masala' },
  { id: 3, name: 'Chicken Parmesan' },
  { id: 4, name: 'Beef Wellington' },
  { id: 5, name: 'Vegetable Stir Fry' },
];

const RecipeApp = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter recipes based on search query (case insensitive)
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeApp;