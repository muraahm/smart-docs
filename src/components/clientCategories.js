import React from 'react';
import "components/styles.scss";
import { useApplicationData } from "hooks/useApplicationData";

export default function Clientcategories(props) {
  const {
    state,
    createCategory
  } = useApplicationData();

  const categories = props.categories
  console.log(categories)
  const categoryList = categories.map(category => {
    return (
      <div className="categoryItem"
        key={category.id}
        id={category.id}
        categoryname={category.name}
        accountantname={category.accountantName}
      >{category.name}</div>
    )
  })

  return (
    <div className="categoryList">
      {categoryList}
      <img
        style={{ cursor: 'pointer' }}
        src="https://cdn3.iconfinder.com/data/icons/watchify-v1-0/70/add-70px-512.png"
        alt="Create"
        height="40" width="40"
        onClick={() => props.createView()}
      />
    </div>
  );
}