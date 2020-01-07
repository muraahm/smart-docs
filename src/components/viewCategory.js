import React from 'react';
import "components/styles.scss";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import AWS from 'aws-sdk'
import axios from "axios";
import config from '../config'


export default function ViewCategory(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));
  const classes = useStyles();

  const userEmail = props.userInfo.email
  const userCategory = props.categoryName
  const currentAccountantCompany = props.accountantCompany
  const [accountant, setAccountant] = React.useState(currentAccountantCompany || '');
  const accountants = props.accountants
  const receipts = props.state.userReciepts


  const handleChangeAccountant = event => {
    setAccountant(event.target.value);
  };

  const changeAccountnat = (accountnat, categoryId) => {
    axios.post(`${config.API_PATH}/api/user/change/accountnat`, { accountant, categoryId })
      .then(response => { })
  }

  AWS.config.update({ //passing keys for bucket access.
    accessKeyId: process.env.REACT_APP_access_key_id,
    secretAccessKey: process.env.REACT_APP_secret_access_key,
    region: 'ca-central-1'
  })
  const s3 = new AWS.S3();


  const [photo, setPhoto] = React.useState('');
  const [photoName, setPhotoName] = React.useState('');
  const onChangeFile = (e) => {
    setPhoto(e.target.files[0])
  }

  const onChangeName = (e) => {
    setPhotoName(e.target.value)
  }
  const upload = (categoryId, userId) => { //upload file function.
    const uploadDate = new Date()
    //post request to the server to save upload date(name in AWS)name and upload date for retriving from AWS
    axios.post(`${config.API_PATH}/api/user/reciept/upload`, { uploadDate, photoName, categoryId, userId })
      .then(response => {
        s3.putObject({
          Bucket: process.env.REACT_APP__BUCKET,
          Key: `${userEmail}/${userCategory}/${response.data.id}.png`,//save file name with date and time with seconds.
          Body: photo,
          ACL: 'public-read'
        }, function (err, data) {
          if (err) console.log('Error', err);
          props.getReceipts(categoryId, userId)
          console.log('Successfully uploaded.');
        })
      })

  };


  const receiptsList = receipts.map(receipt => {
    const url = s3.getSignedUrl('getObject', { //generate url to display photo by passing user email, category and photo name(date and time with seconds).
      Bucket: process.env.REACT_APP__BUCKET,
      Key: `${userEmail}/${userCategory}/${receipt.id}.png`
    })

    return (
      <div className="receiptItem"
        key={receipt.id}
        id={receipt.id}
        uploaddate={receipt.upload_date}
        name={receipt.name}
      >
        <a href={url}>
          <img
            style={{ cursor: 'pointer' }}
            src={url} // generated url from getSignedUrl
            alt="No Preview"
            height="130" width="100"
          />
        </a>

        <div>{receipt.name}</div>
      </div>
    )
  })

  return (
    <div className="receiptsList">
      <div style={{ width: "100%" }}>
        <div className="categoryDetails">
          <div>Category: {userCategory}</div>
          <div className="changeAccountant">Accountant:
        <TextField
              id="standard-multiline-flexible"
              select
              value={accountant}
              onChange={handleChangeAccountant}
            >
              {accountants.map(option => (
                <MenuItem key={option.id} value={option.company}>
                  {option.company}
                </MenuItem>
              ))}
            </TextField>
            <div onClick={() => { changeAccountnat(accountant, props.categoryId) }} style={{ float: "right", cursor: "pointer" }}>Save</div></div>
        </div>
        <div className="fileUpload">
          <form onSubmit={upload}>
            <input type="file" onChange={onChangeFile} />
            <TextField
              id="standard-multiline-flexible"
              label="Enter receipt name"
              multiline
              rowsMax="4"
              onChange={onChangeName}
            />
            <button type='button' onClick={() => upload(props.categoryId, props.userInfo.id)}>Upload ==> </button>
          </form>
        </div>
      </div>
      {receiptsList}
    </div>
  );
}