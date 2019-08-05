import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

export default function Login() {
  // Login states
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const checkToken = () => {
    if (localStorage.getItem("token").length > 0) {
      return true;
    }
    return false;
  };
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
      localStorage.setItem("token", content.token);
      console.log("Login successful");
    }
  };

  return (
    <div>
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
      <Link to="/register">Register</Link>
    </div>
  );
}
