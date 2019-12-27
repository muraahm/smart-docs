import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import S3FileUpload from 'react-s3';



export default function ViewCategory(props) {

  const userEmail = "a.murad@nomail.com"
  const userCategory = "personal"

  const API_KEY = process.env.REACT_APP_access_key_id
  const secret_access = process.env.REACT_APP_secret_access_key
  const config = {
    bucketName: 'smart-docs',
    dirName: `${userEmail} / ${userCategory}`,
    region: 'ca-central-1',
    accessKeyId: API_KEY,
    secretAccessKey: secret_access,
  }

  const upload = (e) => {
    S3FileUpload
      .uploadFile(e.target.files[0], config)
      .then(data => console.log(data.location))
      .catch(err => console.error(err))
  }

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
    { id: 1, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 2, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 3, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 4, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 5, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 6, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 7, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 8, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 9, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 10, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 11, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 12, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 13, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 14, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" },
    { id: 15, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 12, 2019", url: "https://smart-docs.s3.ca-central-1.amazonaws.com/a.murad%40nomail.com/personal/Nov.20%2C2019_1574297998734.gif" }
  ]

  const receiptsList = receipts.map(receipt => {
    return (
      <div className="receiptItem"
        key={receipt.id}
        id={receipt.id}
        uploaddate={receipt.uploadDate}
        purchasedate={receipt.purchaseDate}
      >
        <img
          style={{ cursor: 'pointer' }}
          src={receipt.url}
          alt={receipt.purchaseDate}
          height="80" width="80"
          onClick={() => console.log("create category")}
        />
      </div>
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
            value={accountant}
            onChange={handleChangeAccountant}
          >
            {accountants.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <div onClick={() => { changeAccountnat(accountant) }} style={{ float: "right" }}>Save</div></div>
      </div>
      <div className="categoryDetails">
        <div>Upload: <input
          type="file"
          onChange={upload}
        ></input></div>
      </div>
      {receiptsList}
    </div>
  );
}