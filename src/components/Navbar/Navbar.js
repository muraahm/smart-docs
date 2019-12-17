import React from 'react';
import Collapsible from 'react-collapsible';
import "components/Navbar/styles.scss";



export default function NavBar(props) {
  const name = "sup"
  let mode = props.name ? "LOGGEDIN" : "LOGGEDOUT";

  return (
    <section className="topbar">
      <div className="brand" onClick={() => console.log("hello")}>SmartDocs</div>
      
      {mode === "LOGGEDOUT" && (
      <div className="notLoggedInMenu">
        <div className='hamburgerMenu'>
          <Collapsible trigger="Start Here">
            <div className="accountant">Accountant
              <div className="auth" onClick={() => console.log("hello")}>Register</div>
              <div className="auth" onClick={() => console.log("hello")}>Login</div>
              </div>
              <div className="accountant">Client
              <div className="auth" onClick={() => console.log("hello")}>Register</div>
              <div className="auth" onClick={() => console.log("hello")}>Login</div>
              </div>
            </Collapsible>
            {/* <div className="hamburgerbar"></div>
            <div className="hamburgerbar"></div>
            <div className="hamburgerbar"></div> */}
        </div>
        <div className='dropMenus'>
          <div className="menu">
            <Collapsible trigger="Accountant">
              <div className="auth" onClick={() => console.log("hello")}>Register</div>
              <div className="auth" onClick={() => console.log("hello")}>Login</div>
            </Collapsible>
          </div>

          <div className="menu--coma">/</div>
          <div className="menu">
            <Collapsible trigger="Client">
              <div className="auth" onClick={() => console.log("hello")}>Register</div>
              <div className="auth" onClick={() => console.log("hello")}>Login</div>
            </Collapsible>
          </div>
        </div>
      </div>)}

      {mode === "LOGGEDIN" && (
      <div className="loggedInMenu">
         {name} -> <span onClick={() => console.log("hello")}>Logout</span>
      </div>)}
    </section>
  );
}