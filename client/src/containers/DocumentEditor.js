import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Draft from "../components/Draft";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DocumentEditor({ match }) {
  const [document, setDocument] = useState(null);
  useEffect(() => {
    let id = match.params.id;
    console.log(id);
  });

  //   const getDocument = async () => {
  //     const resp = await axios(`http://localhost:4000/editor/${id}`, {
  //       withCredentials: true
  //     });
  //     console.log(resp.data);
  //     // console.log(responseFetch, "FETCH");
  //   };
  //   useEffect(() => {
  //     getDocument();
  //   });

  return (
    <div>
      <Navbar />
      {document ? <Draft /> : <div>Document not found sorry dude</div>}
      <Draft />
    </div>
  );
}
