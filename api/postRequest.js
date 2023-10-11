import apiClient from "./client";

const postIngredients = (data) => {
  const endpoint = "/api/postIngredients/";
  return apiClient.post(endpoint, data);
};
export { postIngredients };
