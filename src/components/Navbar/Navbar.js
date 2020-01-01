import React from 'react';
import Collapsible from 'react-collapsible';
import "components/Navbar/styles.scss";
import  { useApplicationData }  from "hooks/useApplicationData";



export default function NavBar(props) {
  const {
    logout
  } = useApplicationData();
  let mode = props.name ? "LOGGEDIN" : "LOGGEDOUT";

  return (
    <section className="topbar">
      <div className="brand" onClick={() => console.log("hello")}>SmartDocs</div>

      {mode === "LOGGEDOUT" && (
        <div className="notLoggedInMenu">
          <div className='hamburgerMenu'>
            <Collapsible trigger="Start Here">
              <div className="accountant">Client
              <div className="auth" onClick={() => console.log("hello")}>Register</div>
                <div className="auth" onClick={() => console.log("hello")}>Login</div>
              </div>
              <div className="accountant">Accountant
              <div className="auth" onClick={() => console.log("hello")}>Register</div>
                <div className="auth" onClick={() => console.log("hello")}>Login</div>
              </div>
            </Collapsible>
          </div>
          <div className='dropMenus'>
            <div className="menu">
              <Collapsible trigger="Client">
                <div className="auth" onClick={() => console.log("hello")}>Register</div>
                <div className="auth" onClick={() => console.log("hello")}>Login</div>
              </Collapsible>
            </div>
            <div className="menu--coma">/</div>
            <div className="menu">
              <Collapsible trigger="Accountant">
                <div className="auth" onClick={() => console.log("hello")}>Register</div>
                <div className="auth" onClick={() => console.log("hello")}>Login</div>
              </Collapsible>
            </div>

          </div>
        </div>)}

      {mode === "LOGGEDIN" && (
        <div className="loggedInMenu">
          {props.name} --> <span onClick={() => logout()}>Logout</span>
        </div>)}
    </section>
  );
}