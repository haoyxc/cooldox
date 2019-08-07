import React, { useState, useEffect } from "react";
import Draft from "../components/Draft";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DocumentEditor({ id }) {
  const [document, setDocument] = useState(null);

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
      {document ? <Draft id={id} /> : <div>Document not found sorry dude</div>}
      <Draft />
    </div>
  );
}
