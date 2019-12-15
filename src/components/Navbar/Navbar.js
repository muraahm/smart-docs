import React from 'react';
import "components/Navbar/styles.scss";



export default function NavBar() {

  return (

    <section className="topbar">
      <div className="brand" onClick={() => console.log("hello")}>SmartDocs</div>
      <div className="notLoggedInMenu">
        <div className='dropMenus'>
          <span className="brand" onClick={() => console.log("hello")}>Accountant</span>
          <span className="brand--coma">/</span>
          <span className="brand" onClick={() => console.log("hello")}>Client</span>
        </div>
      </div>

    </section>
  );
}