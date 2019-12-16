import React from 'react';
import Collapsible from 'react-collapsible';
import "components/Navbar/styles.scss";



export default function NavBar() {

  return (
    <section className="topbar">
      <div className="brand" onClick={() => console.log("hello")}>SmartDocs</div>
      <div className="notLoggedInMenu">
        <div className='hamburgerMenu'>
            
          <div className="hamburgerbar">
          <Collapsible trigger="hello">
              <div  onClick={() => console.log("hello")}>Register</div>
              <div  onClick={() => console.log("hello")}>Login</div>
            </Collapsible>
          </div>
          <div className="hamburgerbar"></div>
          <div className="hamburgerbar"></div>
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
      </div>
    </section>
  );
}