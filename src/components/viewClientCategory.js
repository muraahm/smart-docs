import React from 'react';
import "components/styles.scss";
import AWS from 'aws-sdk'

export default function ViewCategory(props) {

  const userEmail = props.userEmail
  const userCategory = props.categoryName

  AWS.config.update({ //passing keys for bucket access.
    accessKeyId: process.env.REACT_APP_access_key_id,
    secretAccessKey: process.env.REACT_APP_secret_access_key,
    region: 'ca-central-1'
  })
  const s3 = new AWS.S3();

  const receipts = props.receipts
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
          <div>
          <div>Category: {userCategory}</div>
          <div>Client: {props.userName}</div>
          </div>
        </div>
      </div>
      {receiptsList}
    </div>
  );
}