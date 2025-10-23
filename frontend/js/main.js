// Example: helper functions to make API calls
async function apiGet(url, token) {
  const res = await fetch(url, { headers: {Authorization: `Bearer ${token}`} });
  return await res.json();
}
