import React, { useState } from "react";
import axios from "axios";

export default function UserPortal() {
  const [docname, setDocname] = useState("");

  const getPortals = async () => {
    try {
      let response = await axios.get("/portals");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDocument = async e => {
    e.preventDefault();
    console.log("in add doc");
    console.log(docname);
    axios
      .post("http://localhost:4000/addDocument", {
        title: docname
      })
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="document name"
        onChange={e => setDocname(e.target.value)}
      />
      <button type="submit" onClick={e => handleAddDocument(e)}>
        New Document
      </button>

      <div>hello this is the userportal</div>
    </div>
  );
}
