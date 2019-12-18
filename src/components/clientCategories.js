import React from 'react';
import "components/styles.scss";

export default function Clientcategories(props) {

  const categoryList = props.categories.map(category => {
    return (
      <div className="categoryItem"
        key={category.id}
        id={category.id}
        categoryname={category.categoryname}
        accountantname={category.accountantname}
      >{category.categoryname}</div>
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
          onClick={() => console.log("create category")}
        />
    </div>
  );
}