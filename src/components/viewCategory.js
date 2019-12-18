import React from 'react';
import "components/styles.scss";

export default function ViewCategory(props) {

  

  const categoryName = "Personal"
  const accountantName = "Acct1"

  const receipts = [
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" }
  ]

  const receiptsList = receipts.map(receipt => {
    return (
      <div className="receiptItem"
        key={receipt.id}
        id={receipt.id}
        uploaddate={receipt.uploadDate}
        purchasedate={receipt.purchaseDate}
      >{receipt.purchaseDate}</div>
    )
  })

  return (

    <div className="receiptsList">
      <div className="categoryDetails">
        <div>Category: {categoryName}</div>
        <div>Accountant: {accountantName}</div>
      </div>{receiptsList}
    </div>
  );
}