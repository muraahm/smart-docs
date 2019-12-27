import React from 'react';
import "components/styles.scss";

export default function Clientcategories(props) {


const categories = [
  {id: 1, categoryName: "Personal", accountantName: "Acct1"},
  {id: 2, categoryName: "Business", accountantName: "Acct2"}
]

  const categoryList = categories.map(category => {
    return (
      <div className="categoryItem"
        key={category.id}
        id={category.id}
        categoryname={category.categoryName}
        accountantname={category.accountantName}
      >{category.categoryName}</div>
    )
  })

  return (
    <div className="categoryList">
      {categoryList}
      <img
          style={{ cursor: 'pointer' }}
          src="https://cdn3.iconfinder.com/data/icons/watchify-v1-0/70/add-70px-512.png"
          alt="Create"
          height= "40" width="40"
          onClick={() => console.log("create category")}
        />
    </div>
  );
}