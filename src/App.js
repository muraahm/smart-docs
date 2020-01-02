import React from 'react';
import NavBar from "components/Navbar/Navbar";
import UserCategoryManagment from "components/userCategoryManagment"
import './styles.scss';
import { useApplicationData } from "hooks/useApplicationData";
import useVisualMode from "hooks/useVisualMode";
import { propStyle } from 'aws-amplify-react';


function App() {
  // const { mode, transition, back } = useVisualMode(PROFILE);
  const {
    state,
    login,
    register,
    logout,
    createCategory,
    listUserCategories
  } = useApplicationData();

  console.log(state)

  let mode = state.userInfo.name ? "LOGGEDIN" : "LOGGEDOUT";
  localStorage.setItem("together::token", state.userInfo.token)
  const token = localStorage.getItem("together::token")

  return (
    <div className="App">
      <NavBar login={login} register={register} state={state} logout={logout}></NavBar>
      {mode === "LOGGEDIN" && (
        <UserCategoryManagment
          state={state}
          createCategory={createCategory}
          listUserCategories={listUserCategories}
        >
        </UserCategoryManagment>
      )}
    </div>
  );
}

export default App;
