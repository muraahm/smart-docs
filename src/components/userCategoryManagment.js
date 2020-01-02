import React from 'react';
import "components/styles.scss";
import { useApplicationData } from "hooks/useApplicationData";
import Clientcategories from "components/clientCategories"
import CreateCategory from "components/createCategory";
import ViewCategory from "components/viewCategory"
import useVisualMode from "hooks/useVisualMode";

const LIST = "LIST"
const CREATE = "CREATE"
const VIEWCATEGORY = "VIEWCATEGORY"


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
  const [accountantCompany, setAccountantCompany] = React.useState('');
  const [categoryName, setCategoryName] = React.useState('');
  const viewCategory = (categoryName, accountantCompany) => {
    setAccountantCompany(accountantCompany)
    setCategoryName(categoryName)
    transition(VIEWCATEGORY)
  }

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
            accountantCompany={accountantCompany}
            categoryName={categoryName}
            accountants={props.state.accountants}
            userInfo={props.state.userInfo}
          // receipts={props.state.receipts}
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