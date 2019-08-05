import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function Register() {
  // Registration states
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  // Login states
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loggedIn, setLogin] = useState(false);
  // Errors
  const [errorMsg, setErrorMsg] = useState("");

  // Form handlers
  const handleRegUser = event => {
    setRegUser(event.target.value);
  };
  const handleRegPass = event => {
    setRegPass(event.target.value);
  };
  const handleRepeatPass = event => {
    setRepeatPass(event.target.value);
  };
  const handleLoginUser = event => {
    setLoginUser(event.target.value);
  };
  const handleLoginPassword = event => {
    setLoginPass(event.target.value);
  };

  // Handle Registration
  const submitRegister = () => {
    if (username.length === 0) {
      setErrorMsg("Please enter a valid username");
    } else if (password.length < 4) {
      setErrorMsg("Please input a password of at least length 4");
    } else if (password !== verifiedPassword) {
      setErrorMsg("The passwords do not match");
    } else {
      postRegister().catch(event => {
        setErrorMsg("Failed to create user, please try again.");
        console.log(event);
      });
    }
  };

  const postRegister = async () => {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: regUser,
        password: regPass
      })
    });
    const content = await response.json();
    if (!content.success) {
      setErrorMsg("Sorry, this user already exists");
    }
  };


  
}
