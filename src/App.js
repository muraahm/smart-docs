import React from 'react';
import NavBar from "components/Navbar/Navbar";
import UserCategoryManagment from "components/userCategoryManagment"
import './styles.scss';
import { useApplicationData } from "hooks/useApplicationData";


function App() {
  // const { mode, transition, back } = useVisualMode(PROFILE);
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


  let mode = state.userInfo && state.userInfo.name ? "LOGGEDIN" : "LOGGEDOUT";

  if (state.userInfo && state.userInfo.token) {
    if (state.userInfo.company) {
      localStorage.setItem("together::accountant", 'yes')
    }
    else
      localStorage.setItem("together::accountant", 'no')
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
