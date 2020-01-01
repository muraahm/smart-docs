import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AWS from 'aws-sdk'

export default function ViewCategory(props) {
  const userEmail = "a.murad@nomail.com"
  const userCategory = "personal"
  const currentAccountantName = 'Baccari Corporation Inc.'
  const currentCategoryName = "Personal"
  const [accountant, setAccountant] = React.useState(currentAccountantName || '');
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
    { id: 2, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 13, 2019" },
    { id: 3, uploadDate: "Mon Dec 30 2019 23:30:23 GMT-0700 (Mountain Standard Time)", purchaseDate: "Oct. 14, 2019" },
    { id: 4, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 15, 2019" },
    { id: 5, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 16, 2019" },
    { id: 6, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 17, 2019" },
    { id: 7, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 18, 2019" },
    { id: 8, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 19, 2019" },
    { id: 9, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 20, 2019" },
    { id: 10, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 21, 2019" },
    { id: 11, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 22, 2019" },
    { id: 12, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 23, 2019" },
    { id: 13, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 24, 2019" },
    { id: 14, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 25, 2019" },
    { id: 15, uploadDate: "Oct. 12, 2019", purchaseDate: "Oct. 26, 2019" }
  ]


  const handleChangeAccountant = event => {
    setAccountant(event.target.value);
  };

  const changeAccountnat = (value) => {
    console.log("changed to:" + value)
  }

  AWS.config.update({ //passing keys for bucket access.
    accessKeyId: process.env.REACT_APP_access_key_id,
    secretAccessKey: process.env.REACT_APP_secret_access_key,
    region: 'ca-central-1'
  })
  const s3 = new AWS.S3();


  const [photo, setPhoto] = React.useState('');
  const [photoName, setPhotoName] = React.useState('');
  const onChange = (e) => {
    setPhotoName(e.target.value)
    setPhoto(e.target.files[0])
  }
  const upload = () => { //upload file function.
    s3.putObject({
      Bucket: process.env.REACT_APP__BUCKET,
      Key: `${userEmail}/${userCategory}/${new Date()}.png`,//save file name with date and time with seconds.
      Body: photo,
      ACL: 'public-read'
    }, function (err, data) {
      if (err) console.log('Error', err);
      else 
      //post request to the server to save upload date(name in AWS)name and upload date for retriving from AWS
      console.log('Successfully uploaded.');
    })
  };


  const receiptsList = receipts.map(receipt => {
    const url = s3.getSignedUrl('getObject', { //generate url to display photo by passing user email, category and photo name(date and time with seconds).
      Bucket: process.env.REACT_APP__BUCKET,
      Key: `${userEmail}/${userCategory}/${receipt.uploadDate}.png`
    })

    return (
      <div className="receiptItem"
        key={receipt.id}
        id={receipt.id}
        uploaddate={receipt.uploadDate}
        purchasedate={receipt.purchaseDate}
      >
        <img
          style={{ cursor: 'pointer' }}
          src={url} // generated url from getSignedUrl
          alt="No Preview"
          height="130" width="100"
          onClick={() => console.log("view")}
        />
        <div>{receipt.purchaseDate}</div>
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
      <div className="fileUpload">
        <div>
          <form onSubmit={upload}>
            <div>
              <input type="file" onChange={onChange} />
            </div>
            <div>
              <button type='button' onClick={upload}>Upload ==> </button>
              <input type="text" placeholder='Add file name' onChange={onChange}></input>
            </div>
          </form>
        </div>
      </div>
      {receiptsList}
    </div>
  );
}