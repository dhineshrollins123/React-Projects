import { myAxios } from "./handler";

export const getAllCategories = () => {
   return myAxios.get("/api/categories/list")
   .then((response) => response.data);
}