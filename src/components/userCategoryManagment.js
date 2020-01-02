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


  const createView = () => {
    transition(CREATE)
  }

  // const back = () => {

  // }

  const create = (category, accountant_company) => {
    props.createCategory(category, props.state.userInfo.email, accountant_company)
      .then(() => props.listUserCategories(props.state.userInfo.email))
      .then(transition(LIST))
  }

  return (
    <div>
      {mode === "LIST" && props.state.userCategories && (
        <Clientcategories categories={props.state.userCategories} createView={createView}></Clientcategories>
      )}
      {mode === "CREATE" && (
        <CreateCategory create={create} accountants={props.state.accountants}></CreateCategory>
      )}

    </div>
  );
}