import { myAxios } from "./handler";

export const getAllCategories = () => {
   return myAxios.get("/api/categories/list")
   .then((response) => response.data);
}

export const getParticularCategoryposts = (categoryId) =>{
   return myAxios.get(`/api/category/${categoryId}/posts`).then(response => response.data);
}