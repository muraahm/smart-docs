import React from 'react';
import "components/styles.scss";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Popup from "reactjs-popup";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { FormHelperText } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { DropzoneArea } from 'material-ui-dropzone'
import AWS from 'aws-sdk'
import axios from "axios";
import config from '../config'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export default function ViewCategory(props) {

  const classes = useStyles();
  const userEmail = props.userInfo.email
  const userCategory = props.categoryName
  const currentAccountantCompany = props.accountantCompany
  const [accountant, setAccountant] = React.useState(currentAccountantCompany || '');
  const accountants = props.accountants
  const receipts = props.state.userReciepts
  const [error, setError] = React.useState(false);


  const handleChangeAccountant = event => {
    setAccountant(event.target.value);
  };
  //api server call to change accountant access to the category 
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

  //set file and name for the s3 uploading
  const [file, setFile] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const onChangeFile = (file) => {
    setFile(file[0])
  }

  const onChangeName = (e) => {
    setFileName(e.target.value)
  }
  const upload = (categoryId, userId) => { //upload file function.

    if (!fileName || !file) {
      setError(true)
    }
    else {
      const uploadDate = new Date()
      //post request to the server to save upload date(name in AWS)name and upload date for retriving from AWS
      axios.post(`${config.API_PATH}/api/user/reciept/upload`, { uploadDate, fileName, categoryId, userId })
        .then(response => {
          s3.putObject({
            Bucket: process.env.REACT_APP__BUCKET,
            //save file name with file id from the database.
            Key: `${userEmail}/${userCategory}/${response.data.id}.png`,
            Body: file,
            ACL: 'public-read'
          }, function (err, data) {
            if (err)
              alert('Sorry, Something went wrong.');
            else {
              props.getReceipts(categoryId, userId)
              alert('Successfully uploaded.');
            }
          })
        })
    }
  };


  const receiptsList = receipts.map(receipt => {
    //generate url to display photo by passing user email, category and photo name(date and time with seconds).
    const url = s3.getSignedUrl('getObject', {
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
        <div className="receipt-name">{receipt.name}</div>
      </div>
    )
  })

  return (
    <div className="receiptsList">
      <div style={{ width: "100%" }}>
        <div className="categoryDetails">
          <div className="category-info">
          <div className="category-name">{userCategory}</div>
          <div className="changeAccountant">Accountant:
        <TextField
              id="standard-multiline-flexible"
              className="accountant-list"
              select
              value={accountant}
              multiline
              onChange={handleChangeAccountant}
            >
              {accountants.map(option => (
                <MenuItem key={option.id} value={option.company}>
                  {option.company}
                </MenuItem>
              ))}
            </TextField>
            <div onClick={() => { changeAccountnat(accountant, props.categoryId) }} className="upload-button">Save</div></div>
            </div>
            <div
            variant="contained"
            color="default"
            className="camera"
          >
            <PhotoCamera />
      </div>
          <Popup trigger={
          <div
            variant="contained"
            color="default"
            className="upload-button"
          >
            Upload
      </div>} modal>
            {close => (
              <div className="uploadModal">
                <FormControl className="form" onSubmit={upload} noValidate autoComplete="off">
                  <button className="close" onClick={() => {
                    close()
                    setError(false)
                  }}>
                    &times;</button>
                  <div><TextField
                    id="name"
                    label="Name"
                    rowsMax="4"
                    onChange={onChangeName}
                    required={true}
                    className="text"
                  /></div>
                  <div className="dropZone">
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      onChange={onChangeFile}
                    />
                  </div>
                  <div className="actions">
                    <button
                      className="action"
                      onClick={() => {
                        upload(props.categoryId, props.userInfo.id)
                        if (file && fileName) {
                          close();
                        }
                      }}>Save</button>
                  </div>
                  {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                </FormControl>
              </div>
            )}
          </Popup>
        </div>
        
      </div>
      {receiptsList}
    </div>
  );
}