import apiClient from "./client";

const getIngredients = () => {
  const endpoint = "/api/getIngredients/";

  return apiClient.get(endpoint);
};

const getCategories = () => {
  const endpoint = "/api/getCategories/";

  return apiClient.get(endpoint);
};
export { getIngredients, getCategories  };
