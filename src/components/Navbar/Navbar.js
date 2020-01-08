import React from 'react';
import Collapsible from 'react-collapsible';
import "components/Navbar/styles.scss";
import Popup from "reactjs-popup";
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';



export default function NavBar(props) {
  // nav bar to recognice if user loggedin or not
  let mode = props.state.userInfo && props.state.userInfo.name ? "LOGGEDIN" : "LOGGEDOUT";
  //handle registeration and login
  //handle error fiels empty
  const [error, setError] = React.useState(false);

  const [name, setName] = React.useState('');
  const handleChangeName = event => {
    setName(event.target.value);
  };
  const [accountantCompany, setAccountantCompany] = React.useState('');
  const handleChangeAccountantCompany = event => {
    setAccountantCompany(event.target.value);
  };
  const [email, setEmail] = React.useState('');
  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState('');
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };


  //client registeration and login
  const registerUser = () => {
    if (!name || !email || !password) {
      setError(true)
    }
    else {
      props.register(name, email, password)
    }


  }
  const loginUser = () => {
    if (!email || !password) {
      setError(true)
    }
    else {
      props.login(email, password)
    }
  }


  //accountant registeration and login
  const registerAccontant = () => {
    if (!name || !email || !password || !accountantCompany) {
      setError(true)
    }
    else {
      props.registerAccountant(name, accountantCompany, email, password)
    }
  }
  const loginAccountant = () => {
    if (!email || !password) {
      setError(true)
    }
    else {
      props.loginAccountant(email, password)
    }
  }


  return (
    <section className="topbar">
      <div className="brand" onClick={() => console.log("hello")}>SmartDocs</div>
      {mode === "LOGGEDOUT" && (
        <div className="notLoggedInMenu">
          <div className='hamburgerMenu'>
            {/* small screen and mobile view nave bar */}
            <Collapsible trigger={<div className="hamburgerMenuTrigger">Start Here</div>}>
              <div className="accountant">Client
              <Popup trigger={<div className="auth">Register</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Register </div>
                        <div><TextField
                          id="name"
                          label="Name"
                          rowsMax="4"
                          onChange={handleChangeName}
                          required={true}
                        /></div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            rowsMax="4"
                            onChange={handleChangeEmail}
                            required={true}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          rowsMax="4"
                          onChange={handleChangePassword}
                          required={true}
                          type="password"
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              registerUser();
                              if (name && email && password) {
                                close();
                              }
                            }}>Register</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
                <Popup trigger={<div className="auth">Login</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Login </div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            required={true}
                            rowsMax="4"
                            onChange={handleChangeEmail}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          type="password"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangePassword}
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              loginUser();
                              if (email && password) {
                                close();
                              }
                            }}>Login</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
              </div>
              <div className="accountant">Accountant
              <Popup trigger={<div className="auth">Register</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Register </div>
                        <div><TextField
                          id="name"
                          label="Name"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangeName}
                        /></div>
                        <div><TextField
                          id="company"
                          label="Company"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangeAccountantCompany}
                        />
                        </div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            required={true}
                            rowsMax="4"
                            onChange={handleChangeEmail}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          type="password"
                          rowsMax="4"
                          required={true}
                          onChange={handleChangePassword}
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              registerAccontant();
                              if (name && email && password && accountantCompany) {
                                close();
                              }
                            }}>Register</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
                <Popup trigger={<div className="auth">Login</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Login </div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            required={true}
                            rowsMax="4"
                            onChange={handleChangeEmail}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          type="password"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangePassword}
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              loginAccountant();
                              if (email && password) {
                                close();
                              }
                            }}>Login</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
              </div>
            </Collapsible>
          </div>

          {/* bigger screens view */}
          <div className='dropMenus'>
            <div className="menu">
              <Collapsible className="clientDropMenu" trigger={<div className="clientDropMenuTrigger">Client</div>}>
                <Popup trigger={<div className="auth">Register</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Register </div>
                        <div><TextField
                          id="name"
                          label="Name"
                          rowsMax="4"
                          onChange={handleChangeName}
                          required={true}
                        /></div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            rowsMax="4"
                            onChange={handleChangeEmail}
                            required={true}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          rowsMax="4"
                          onChange={handleChangePassword}
                          required={true}
                          type="password"
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              registerUser();
                              if (name && email && password) {
                                close();
                              }
                            }}>Register</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
                <Popup trigger={<div className="auth">Login</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Login </div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            required={true}
                            rowsMax="4"
                            onChange={handleChangeEmail}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          type="password"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangePassword}
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              loginUser();
                              if (email && password) {
                                close();
                              }
                            }}>Login</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
              </Collapsible>
            </div>
            <div className="menu--coma">/</div>
            <div className="menu">
              <Collapsible className="accountantDropMenu" trigger={<div className="accountantDropMenuTrigger">Accountant</div>}>
                <Popup trigger={<div className="auth">Register</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Register </div>
                        <div><TextField
                          id="name"
                          label="Name"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangeName}
                        /></div>
                        <div><TextField
                          id="company"
                          label="Company"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangeAccountantCompany}
                        />
                        </div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            required={true}
                            rowsMax="4"
                            onChange={handleChangeEmail}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          type="password"
                          rowsMax="4"
                          required={true}
                          onChange={handleChangePassword}
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              registerAccontant();
                              if (name && email && password && accountantCompany) {
                                close();
                              }
                            }}>Register</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
                <Popup trigger={<div className="auth">Login</div>} modal>
                  {close => (
                    <div className="modal">
                      <FormControl className="form" noValidate autoComplete="off">
                        <button className="close" onClick={() => {
                          close()
                          setError(false)
                        }}>
                          &times;</button>
                        <div className="header"> Login </div>
                        <div>
                          <TextField
                            id="email"
                            label="Email"
                            required={true}
                            rowsMax="4"
                            onChange={handleChangeEmail}
                          /></div>
                        <div><TextField
                          id="password"
                          label="Password"
                          type="password"
                          required={true}
                          rowsMax="4"
                          onChange={handleChangePassword}
                        /></div>
                        <div className="actions">
                          <button
                            className="action"
                            onClick={() => {
                              loginAccountant();
                              if (email && password) {
                                close();
                              }
                            }}>Login</button>
                        </div>
                        {error === true && <FormHelperText error={error}>All fields required</FormHelperText>}
                      </FormControl>
                    </div>
                  )}
                </Popup>
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