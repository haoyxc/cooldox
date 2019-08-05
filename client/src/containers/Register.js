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


  
}
