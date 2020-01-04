import React from 'react';
import Collapsible from 'react-collapsible';
import "components/Navbar/styles.scss";
import Popup from "reactjs-popup";
import TextField from '@material-ui/core/TextField';



export default function NavBar(props) {
  let mode = props.state.userInfo && props.state.userInfo.name ? "LOGGEDIN" : "LOGGEDOUT";


  const [name, setName] = React.useState('');
  const handleChangeName = event => {
    setName(event.target.value);
  };
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState('');
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const registerUser = () => {
    props.register(name, email, password)
  }

  const loginUser = () => {
    props.login(email, password)
  }


  return (
    <section className="topbar">
      <div className="brand" onClick={() => console.log("hello")}>SmartDocs</div>
      {mode === "LOGGEDOUT" && (
        <div className="notLoggedInMenu">
          <div className='hamburgerMenu'>
            <Collapsible trigger="Start Here">
              <div className="accountant">Client
              <Popup trigger={<div className="auth">Register</div>} modal>
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;</button>
                      <div><TextField
                        id="standard-multiline-flexible"
                        label="Name"
                        multiline
                        rowsMax="4"
                        onChange={handleChangeName}
                        error={name === ""}
                        helperText={name === "" ? 'Empty field!' : ' '}
                      /></div>
                      <div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Email"
                          multiline
                          rowsMax="4"
                          onChange={handleChangeEmail}
                        /></div>
                      <div><TextField
                        id="standard-multiline-flexible"
                        label="Password"
                        multiline
                        rowsMax="4"
                        onChange={handleChangePassword}
                      /></div>
                      <div className="actions">
                        <button
                          className="button"
                          onClick={() => {
                            registerUser();
                            close();
                          }}>Register</button>
                      </div>
                    </div>
                  )}
                </Popup>


                <Popup trigger={<div className="auth">Login</div>} modal>
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;</button>
                      <div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Email"
                          multiline
                          rowsMax="4"
                          onChange={handleChangeEmail}
                        /></div>
                      <div><TextField
                        id="standard-multiline-flexible"
                        label="Password"
                        multiline
                        rowsMax="4"
                        onChange={handleChangePassword}
                      /></div>
                      <div className="actions">
                        <button
                          className="button"
                          onClick={() => {
                            loginUser();
                            close();
                          }}>Login</button>
                      </div>
                    </div>
                  )}
                </Popup>
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
                <Popup trigger={<div className="auth">Register</div>} modal>
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;</button>
                      <div><TextField
                        id="standard-multiline-flexible"
                        label="Name"
                        multiline
                        rowsMax="4"
                        onChange={handleChangeName}
                      /></div>
                      <div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Email"
                          multiline
                          rowsMax="4"
                          onChange={handleChangeEmail}
                        /></div>
                      <div><TextField
                        id="standard-multiline-flexible"
                        label="Password"
                        multiline
                        rowsMax="4"
                        onChange={handleChangePassword}
                      /></div>
                      <div className="actions">
                        <button
                          className="button"
                          onClick={() => {
                            registerUser();
                            close();
                          }}>Register</button>
                      </div>
                    </div>
                  )}
                </Popup>


                <Popup trigger={<div className="auth">Login</div>} modal>
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>
                        &times;</button>
                      <div>
                        <TextField
                          id="standard-multiline-flexible"
                          label="Email"
                          multiline
                          rowsMax="4"
                          onChange={handleChangeEmail}
                        /></div>
                      <div><TextField
                        id="standard-multiline-flexible"
                        label="Password"
                        multiline
                        rowsMax="4"
                        onChange={handleChangePassword}
                      /></div>
                      <div className="actions">
                        <button
                          className="button"
                          onClick={() => {
                            loginUser();
                            close();
                          }}>Login</button>
                      </div>
                    </div>
                  )}
                </Popup>
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

      {mode === "LOGGEDIN" && ( //handle logout functionality if the user loggedin
        <div className="loggedInMenu">
          {props.state.userInfo.name} --> <span onClick={() => props.logout()}>Logout</span>
        </div>)}
    </section>
  );
}