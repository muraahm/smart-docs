import React from 'react';
import "components/styles.scss";

export default function Clientcategories(props) {

  const categories = props.categories
  const categoryList = categories.map(category => {

    //generate categories for the client view
    return (
      <div className="categoryItem"
        key={category.id}
        id={category.id}
        categoryname={category.name}
        accountantcompany={category.accountant_company}
        onClick={() => props.viewCategory(category, category.accountant_company)}
      >{category.name}</div>
    )
  })

  //categories main view
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