import React, { useEffect } from 'react';
import NavBar from "components/Navbar/Navbar";
import Clientcategories from "components/clientCategories"
import UserCategoryManagment from "components/userCategoryManagment"
import './styles.scss';
import { useApplicationData } from "hooks/useApplicationData";
import useVisualMode from "hooks/useVisualMode";
const PROFILE = 'PROFILE';

function App() {
  // const { mode, transition, back } = useVisualMode(PROFILE);
  const {
    state,
    login,
    createCategory
  } = useApplicationData();


  useEffect(() => {
    login("testEmailTest@test.com", "testPassword")
    // .then(createCategory("personal", "testEmailTest@test.com", 1))
  }, []);

  let mode = state.userInfo.name ? "LOGGEDIN" : "LOGGEDOUT";

  return (
    <div className="App">
      <NavBar name={state.userInfo.name}></NavBar>
      {mode === "LOGGEDIN" && (
        <UserCategoryManagment categories={state.userCategories} userInfo={state.userInfo}></UserCategoryManagment>
        )}
    </div>
  );
}

export default App;
