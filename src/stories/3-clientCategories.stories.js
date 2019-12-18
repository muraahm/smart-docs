import React from "react";
import Clientcategories from "components/clientCategories";

const categories = [
  {id: 1, categoryname: "Personal", accountantname: "Acct1"},
  {id: 2, categoryname: "Business", accountantname: "Acct2"}
]
export default {
  title: "Client categories"
};



export const Categories = () => (
  
  <Clientcategories 
  categories={categories}
  >
  </Clientcategories>
);