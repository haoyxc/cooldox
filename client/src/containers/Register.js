import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Register() {
  // Registration states
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  
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
  
  // Handle Registration
  const submitRegister = () => {
    if (regUser.length === 0) {
      setErrorMsg("Please enter a valid username");
    } else if (regPass.length < 4) {
      setErrorMsg("Please input a password of at least length 4");
    } else if (regPass !== repeatPass) {
      setErrorMsg("The passwords do not match");
    } else {
      postRegister().catch(event => {
        setErrorMsg("Failed to create user, please try again.");
        console.log(event);
      });
    }
  };

  const postRegister = async () => {
    const response = await fetch("http://localhost:4000/register", {
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

  return (
      <div>
          <Navbar />
          <div>
            <h3>Register</h3>
            <hr />
            <p>{errorMsg}</p>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={regUser}
              onChange={e => handleRegUser(e)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={regPass}
              onChange={e => handleRegPass(e)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="verify password"
              value={repeatPass}
              onChange={e => handleRepeatPass(e)}
            />
            <br />
            <button onClick={() => submitRegister()} className="register-submit-btn">
              Submit
            </button>
          </div>
      </div>
  )

}
