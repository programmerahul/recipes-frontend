import http from "./httpServices";
export async function getRecipes() {
  const { data } = await http.get("/recipes");
  return data;
}
export async function getRecipe(id) {
  const { data } = await http.get(`/recipes/${id}`);
  return data;
}
export async function deleteRecipe(id) {
  const { data } = await http.delete(`/recipes/${id}`);
  return data;
}
export async function newRecipe(recipe) {
  const { data } = await http.post(`/recipes/`, recipe);
  return data;
}
export async function updateRecipe(id, recipe) {
  const { data } = await http.put(`/recipes/${id}`, recipe);
  return data;
}
