import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function ViewCategory(props) {
  const currentAccountantName = 'Baccari Corporation Inc.'
  const currentCategoryName = "Personal"

  const [accountant, setAccountant] = React.useState(currentAccountantName || '');
  const handleChangeAccountant = event => {
    setAccountant(event.target.value);
  };

  const changeAccountnat = (value) => {
    console.log("changed to:" + value)
  }
  const accountants = [
    {
      value: accountant
    },
    {
      value: 'USD'
    },
    {
      value: 'EUR'
    },
    {
      value: 'BTC'
    },

    {
      value: 'JPY'
    }
  ];
  const receipts = [
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 2, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 3, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 4, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 5, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 6, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 7, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 8, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 9, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 10, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 11, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 12, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 13, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 14, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" },
    { id: 15, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019" }
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
        <div>Category: {currentCategoryName}</div>
        <div className="changeAccountant">Accountant:
        <TextField
            id="standard-multiline-flexible"
            select
            // label={accountant}
            value={accountant}
            onChange={handleChangeAccountant}
          >
            {accountants.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <div onClick={() => { changeAccountnat(accountant) }} style={{float: "right"}}>Save</div></div>
      </div>{receiptsList}
    </div>
  );
}