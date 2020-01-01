import React from 'react';
import "components/styles.scss";
import { useApplicationData } from "hooks/useApplicationData";
import Clientcategories from "components/clientCategories"
import CreateCategory from "components/createCategory";
import useVisualMode from "hooks/useVisualMode";

const LIST = "LIST"
const CREATE = "CREATE"


export default function UserCategoryManagment(props) {
  const { mode, transition, back } = useVisualMode(LIST);
  const {
    createCategory,
    listUserCategories
  } = useApplicationData();


  const createView = () => {
    transition(CREATE)
  }

  const create = (category, accountant_company) => {
    createCategory(category, props.userInfo.email, accountant_company)
      .then(() => listUserCategories(props.userInfo.email))
      .then(transition(LIST))
  }


  return (
    <div>
      {mode === "LIST" && (
        <Clientcategories categories={props.categories} createView={createView}></Clientcategories>
      )}
      {mode === "CREATE" && (
        <CreateCategory create={create}></CreateCategory>
      )}

    </div>
  );
}