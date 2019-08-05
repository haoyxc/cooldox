import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Navbar() {
  // Login states
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let checkToken = localStorage.getItem("token")

  // Errors
  const [errorMsg, setErrorMsg] = useState("");

  // Form handlers
  const handleLoginUser = event => {
    setLoginUser(event.target.value);
  };
  const handleLoginPass = event => {
    setLoginPass(event.target.value);
  };

  // Handle Login
  const postLogin = async () => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: loginUser,
        password: loginPass
      })
    });
    const content = await response.json();
    console.log(content);
    if (!content.success) {
      setErrorMsg("Wrong username or password");
    } else {
      setLoggedIn(true);
      localStorage.setItem("token", content.token)
      console.log("Login successful");
    }
  };

  // Handle Logout
  const logout = async () => {
    const response = await fetch("http://localhost:4000/logout", {
      method: "GET"
    });
    const content = await response.json();
    console.log(content)
    if (!content.success) {
      setErrorMsg("Logout unsuccessful");
    } else {
      setLoggedIn(false);
      localStorage.setItem("token",null)
    }
  };


  if (loggedIn) {
    return <Redirect to="/portal" />;
  } else {
    return (
      <div>
        <nav className="navbar navbar-light bg-light" id="register-navbar">
          <div className="navbar-child" />
          <a href="/" className="navbar-brand header-logo navbar-child">
            HORIZODOCZ
          </a>
          {!checkToken ? (
            <div className="login-wrapper navbar-child">
              <input
                type="text"
                placeholder="username"
                className="form-control mr-sm-2"
                value={loginUser}
                onChange={e => handleLoginUser(e)}
              />
              <input
                type="password"
                placeholder="password"
                className="form-control mr-sm-2"
                value={loginPass}
                onChange={e => handleLoginPass(e)}
              />
              <button
                onClick={() =>
                  postLogin().catch(e => {
                    setErrorMsg("Login request failed, please try again.");
                  })
                }
                className="login-btn"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="login-wrapper navbar-child">
              <button
                onClick={() =>
                  logout().catch(e => {
                    setErrorMsg("Logout request failed, please try again.");
                  })
                }
                className="login-btn"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    );
  }
}
