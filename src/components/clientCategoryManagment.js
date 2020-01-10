import React from 'react';
import "components/styles.scss";
import ViewClientCategory from "components/viewClientCategory"
import AccountantClients from "components/accountantClients"
import useVisualMode from "hooks/useVisualMode";
import { useApplicationData } from "hooks/useApplicationData";

//transitioning modes
const LISTCLIENTS = "LISTCLIENTS"
const LISTCLIENTRECEIPTS = "LISTCLIENTRECEIPTS"


export default function ClientCategoryManagment(props) {
  const { mode, transition } = useVisualMode(LISTCLIENTS);
  const {
    getReceipts,
    state
  } = useApplicationData();


  //handle view category and pass infor the the get receipts api call
  const [category, setCategory] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const viewCategory = (category, userId, userEmail, userName) => {
    setUserEmail(userEmail)
    setUserName(userName)
    setCategory(category)
    getReceipts(category.category_id, userId)
      .then(transition(LISTCLIENTRECEIPTS))
  }


  return (
    <div>
      {mode === LISTCLIENTS &&
        (
          <div className="accountantClients">
            <AccountantClients
              state={props.state}
              viewCategory={viewCategory}
            >
            </AccountantClients>
          </div>
        )}
      {mode === LISTCLIENTRECEIPTS &&
        (
          <div className="accountantClients">
            <AccountantClients
              state={props.state}
              viewCategory={viewCategory}
            >
            </AccountantClients>
            <ViewClientCategory
              // state={state}
              userEmail={userEmail}
              categoryName={category.category_name}
              userName={userName}
              // categoryId={category.id}
              receipts={state.userReciepts}
            ></ViewClientCategory>
          </div>
        )}
    </div>
  );
}