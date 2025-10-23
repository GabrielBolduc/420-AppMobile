// services/martha.js
const BASE_URL = "http://martha.jh.shawinigan.info";

/**
 * httpPost: bas niveau -> POST to /queries/:queryName/execute
 * - authBase64: string for header 'auth' (base64 username:password)
 * - body: plain JS object (sent as JSON) or {} if none
 */
async function httpPost(queryName, authBase64, body = {}) {
  const url = `${BASE_URL}/queries/${queryName}/execute`;
  const headers = { 'Content-Type': 'application/json' };
  if (authBase64) headers['auth'] = authBase64;

  let resp;
  try {
    resp = await fetch(url, {
      method: 'POST',
      headers,
      body: body && Object.keys(body).length ? JSON.stringify(body) : undefined,
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
    throw new Error(json.error ?? 'API error');
  }
  return json;
}

/* ---------------------------
   High-level helpers (queries)
   --------------------------- */

// Auth (expects query named 'select-user-auth' returning user row(s))
export async function loginUser(authBase64, { username, password }) {
  const json = await httpPost('select-user-auth', authBase64, { username, password });
  const data = json.data ?? [];
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid username or password');
  }
  return data[0];
}

// select-recipes (optionally take user id)
export async function fetchRecipes(authBase64, userId) {
  const body = (typeof userId !== 'undefined' && userId !== null) ? { id: Number(userId) } : {};
  const json = await httpPost('select-recipes', authBase64, body);
  return json.data ?? [];
}

// insert-recipe -> returns lastInsertId maybe
export async function insertRecipe(authBase64, recipeBody) {
  const json = await httpPost('insert-recipe', authBase64, recipeBody);
  return { lastInsertId: json.lastInsertId ?? null };
}

// update-recipe
export async function updateRecipe(authBase64, recipeBody) {
  await httpPost('update-recipe', authBase64, recipeBody);
  return { ok: true };
}

// delete-recipe
export async function deleteRecipe(authBase64, recipeBody) {
  await httpPost('delete-recipe', authBase64, recipeBody);
  return { ok: true };
}
