import React from "react";
import Clientcategories from "components/clientCategories";
import CreateCategory from "components/createCategory";
import ViewCategory from "components/viewCategory";

export default {
  title: "Client categories"
};

export const Categories = () => (
  
  <Clientcategories></Clientcategories>
);

export const Create = () => (
  <CreateCategory></CreateCategory>
);

export const DisplayCategory = () => (
  <ViewCategory></ViewCategory>
);