import React from 'react';
import "components/styles.scss";
import Clientcategories from "components/clientCategories"
import CreateCategory from "components/createCategory";
import ViewCategory from "components/viewCategory"
import useVisualMode from "hooks/useVisualMode";
import { useApplicationData } from "hooks/useApplicationData";

//transitioning modes
const LIST = "LIST"
const CREATE = "CREATE"
const VIEWCATEGORY = "VIEWCATEGORY"


export default function UserCategoryManagment(props) {
  
  const { mode, transition } = useVisualMode(LIST);
  const {
    getReceipts,
    state
  } = useApplicationData();

  //transition to creat component
  const createView = () => {
    transition(CREATE)
  }


  //api call to server for creating new category and transition to list categories
  const create = (category, accountant_company) => {
    props.createCategory(category, props.state.userInfo.email, accountant_company)
      .then(() => props.listUserCategories(props.state.userInfo.email))
      .then(transition(LIST))
  }


  //handle view single category functionality
  const [accountantCompany, setAccountantCompany] = React.useState('');
  const [category, setCategory] = React.useState('');
  const viewCategory = (category, accountantCompany) => {
    setAccountantCompany(accountantCompany)
    setCategory(category)
    getReceipts(category.id, props.state.userInfo.id)
      .then(transition(VIEWCATEGORY))
  }

  // const back = () => {
  // }

  return (
    <div>
      {mode === "LIST" && props.state.userCategories && (
        <Clientcategories categories={props.state.userCategories} createView={createView} viewCategory={viewCategory}></Clientcategories>
      )}
      {mode === "CREATE" && (
        <CreateCategory create={create} accountants={props.state.accountants}></CreateCategory>
      )}

      {mode === "VIEWCATEGORY" && props.state.userCategories && (
        <div className="main">
          <ViewCategory
            getReceipts={getReceipts}
            state={state}
            accountantCompany={accountantCompany}
            categoryName={category.name}
            categoryId={category.id}
            accountants={props.state.accountants}
            userInfo={props.state.userInfo}
          ></ViewCategory>
          <Clientcategories
            categories={props.state.userCategories}
            createView={createView}
            viewCategory={viewCategory}
          ></Clientcategories>
        </div>
      )}

    </div>
  );
}