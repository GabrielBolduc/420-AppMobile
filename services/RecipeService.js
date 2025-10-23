
import * as Martha from './martha';

export async function getAllRecipes(authBase64, userId) {
  return await Martha.fetchRecipes(authBase64, userId);
}

export async function createRecipe(authBase64, recipe, userId) {
  const body = {
    category: String(recipe.category),
    name: recipe.name,
    duration_hours: Number(recipe.durationHours),
    duration_minutes: Number(recipe.durationMinutes),
    description: recipe.description,
    ...(userId ? { user_id: Number(userId) } : {}),
  };
  return await Martha.insertRecipe(authBase64, body);
}


export async function updateRecipe(authBase64, recipe) {
  const body = {
    id: Number(recipe.id),
    category: String(recipe.category),
    name: recipe.name,
    duration_hours: Number(recipe.durationHours),
    duration_minutes: Number(recipe.durationMinutes),
    description: recipe.description,
  };
  return await Martha.updateRecipe(authBase64, body);
}

export async function removeRecipe(authBase64, id, userId) {
  const body = { id: Number(id), ...(userId ? { user_id: Number(userId) } : {}) };
  return await Martha.deleteRecipe(authBase64, body);
}
