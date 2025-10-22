const BASE_URL = "http://martha.jh.shawinigan.info";

async function httpPost(queryName, authBase64, body = {}) {
  const url = `${BASE_URL}/queries/${queryName}/execute`;

  const headers = {
    'Content-Type': 'application/json',
  };
  if (authBase64) headers['auth'] = authBase64;

  let resp;
  try {
    resp = await fetch(url, {
      method: 'POST',
      headers,
      body: Object.keys(body).length ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error(`Network error: ${err.message}`);
  }

  let json;
  try {
    json = await resp.json();
  } catch (err) {
    throw new Error(`Invalid JSON response: ${err.message}`);
  }

  if (!json || typeof json.success === 'undefined') {
    throw new Error('Invalid API response');
  }

  if (!json.success) {
    const message = json.error ?? 'Unknown API error';
    throw new Error(message);
  }

  return json;
}


// Authentification : select-user-auth
export async function loginUser(authBase64, { username, password }) {
  // calls select-user-auth with body {username, password}
  const json = await httpPost('select-user-auth', authBase64, { username, password });
  const data = json.data ?? [];
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid username or password');
  }
  // return first user row (id, username)
  return data[0];
}

// Recipes
export async function fetchRecipes(authBase64, userId) {
  // select-recipes expects body id = user id
  const json = await httpPost('select-recipes', authBase64, { id: Number(userId) });
  const data = json.data ?? [];
  return data;
}

export async function insertRecipe(authBase64, recipe) {

  const body = {
    category: String(recipe.category),
    name: recipe.name,
    duration_hours: Number(recipe.durationHours),
    duration_minutes: Number(recipe.durationMinutes),
    description: recipe.description,
    user_id: Number(recipe.user_id),
  };
  const json = await httpPost('insert-recipe', authBase64, body);
  return {
    lastInsertId: json.lastInsertId ?? null,
  };
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
  const json = await httpPost('update-recipe', authBase64, body);
  return { ok: true };
}

export async function deleteRecipe(authBase64, id, user_id) {
  const body = { id: Number(id), user_id: Number(user_id) };
  const json = await httpPost('delete-recipe', authBase64, body);
  return { ok: true };
}
