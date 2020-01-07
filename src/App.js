import React from 'react';
import NavBar from "components/Navbar/Navbar";
import UserCategoryManagment from "components/userCategoryManagment"
import ClientCategoryManagment from "components/clientCategoryManagment"
import './styles.scss';
import { useApplicationData } from "hooks/useApplicationData";


function App() {
  const {
    state,
    login,
    register,
    logout,
    createCategory,
    listUserCategories,
    loginAccountant,
    registerAccountant
  } = useApplicationData();

  //check if user logged in or not
  let mode = state.userInfo && state.userInfo.name ? "LOGGEDIN" : "LOGGEDOUT";

  //check if the user client or accountant
  if (state.userInfo && state.userInfo.token) {
    if (state.userInfo.company) {
      localStorage.setItem("together::accountant", 'yes')
    }
    else
      localStorage.setItem("together::accountant", 'no')

    //store token for the useEffect and check token validation
    localStorage.setItem("together::token", state.userInfo.token)
  }


  return (
    <div className="App">
      <NavBar
        login={login}
        register={register}
        loginAccountant={loginAccountant}
        registerAccountant={registerAccountant}
        state={state}
        logout={logout}>
      </NavBar>
      {mode === "LOGGEDIN" && !state.userInfo.company &&
        (
          <UserCategoryManagment
            state={state}
            createCategory={createCategory}
            listUserCategories={listUserCategories}
          >
          </UserCategoryManagment>
        )}
      {mode === "LOGGEDIN" && state.userInfo.company &&
        (
          <ClientCategoryManagment
            state={state}
          >
          </ClientCategoryManagment>
        )}
    </div>
  );
}

export default App;
