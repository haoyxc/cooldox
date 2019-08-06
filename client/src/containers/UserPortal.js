import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function UserPortal() {
  const [docname, setDocname] = useState("");
  const [findDocName, setFindDocName] = useState("");

  const getPortals = async () => {
    try {
      let response = await axios.get("/portals");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNewDocument = async e => {
    e.preventDefault();
    console.log("in add doc");
    console.log(docname);
    try {
      await axios.post("http://localhost:4000/newDocument", {
        title: docname
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDocument = async e => {
    e.preventDefault();
    console.log("in find doc to add");
    console.log(findDocName);
    try {
      await axios.post("http://localhost:4000/addDocument", {
        title: findDocName
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="portal-content">
        <div className="new-doc-container">
          <h2>Add a New Document</h2>
          <input
            type="text"
            placeholder="document name.."
            onChange={e => setDocname(e.target.value)}
          />
          <button type="submit" onClick={e => handleNewDocument(e)}>
            Add!
          </button>
        </div>
        <div className="add-doc-container">
          <h2>Find a document to Add</h2>
          <input
            type="text"
            placeholder="document name to find.."
            onChange={e => setFindDocName(e.target.value)}
          />
          <button type="submit" onClick={e => handleAddDocument(e)}>
            Find!
          </button>
        </div>
      </div>
    </div>
  );
}
