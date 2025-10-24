import Recipe from '../models/Recipe.js';

const BASE_URL = "http://martha.jh.shawinigan.info/queries";
const AUTH = 'Z2FicmllbDpQVTUwMEVzTmY2KjNxdg==';

async function marthaFetch(queryName, body = {}, authHeader = AUTH) {
  const response = await fetch(`${BASE_URL}/${queryName}/execute`, {
    method: 'POST',
    headers: {
      auth: authHeader,
      'Content-Type': 'application/json'
    },
    body: body && Object.keys(body).length ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = await response.json();
  if (!json.success) throw new Error(json.error || 'Erreur Martha');
  return json;
}

export async function getAllRecipes(auth = AUTH) {
  const res = await marthaFetch('select-recipes', {}, auth);
  return (res.data || []).map(r => new Recipe(r));
}

export async function addRecipe(recipeInstance, auth = AUTH) {
  const payload = typeof recipeInstance.toJSON === 'function' ? recipeInstance.toJSON() : recipeInstance;
  const res = await marthaFetch('insert-recipe', payload, auth);
  return res;
}

export async function updateRecipe(recipeInstance, auth = AUTH) {
  const payload = typeof recipeInstance.toJSON === 'function' ? recipeInstance.toJSON() : recipeInstance;
  const res = await marthaFetch('update-recipe', payload, auth);
  return res;
}

export async function deleteRecipe(id, user_id, auth = AUTH) {
  const res = await marthaFetch('delete-recipe', { id, user_id }, auth);
  return res;
}
