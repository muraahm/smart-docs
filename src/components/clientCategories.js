import React from 'react';
import "components/styles.scss";


export default function Clientcategories(props) {

  const categoryList = props.categories.map(category => {
    return (
      <div className="categoryItem"
        key={category.id}
        id={category.id}
        categoryName={category.categoryname}
        accountantName={category.accountantname}
      >{category.categoryname}</div>
    )
  })

  return (
    <div className="categoryList">
      {categoryList}
      <img
          style={{ cursor: 'pointer' }}
          src="images/add-64.png"
          alt="Create"
          onClick={() => console.log("create category")}
        />
    </div>
  );
}