import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Navbar() {
  const [errorMsg, setErrorMsg] = useState("");
  const [logoutPress, setLogoutPress] = useState(false);
  // Handle Logout
  const logout = async () => {
    const response = await fetch("http://localhost:4000/logout", {
      method: "GET"
    });
    const content = await response.json();
    console.log(content);
    if (!content.success) {
      setErrorMsg("Logout unsuccessful");
    } else {
      localStorage.setItem("token", "");
      setLogoutPress(true);
    }
  };    

  if(logoutPress){
      return <Redirect to="/"/>
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light" id="register-navbar">
        <div className="navbar-child" />
        <a href="/" className="navbar-brand header-logo navbar-child">
          HORIZODOCZ
        </a>
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
      </nav>
    </div>
  );
}
