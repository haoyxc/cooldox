import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Redirect, Link } from "react-router-dom";

export default function UserPortal() {
  const [docname, setDocname] = useState("");
  const [newDocPass, setNewDocPass] = useState("");

  const [findDocId, setDocId] = useState("");
  const [findDocPass, setFindDocPass] = useState("");

  const [allDocuments, setAllDocuments] = useState(null);

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
    console.log(docname, "DOCNAME");
    try {
      let response = await axios.post(
        "http://localhost:4000/newDocument",
        {
          title: docname,
          password: newDocPass
        },
        {
          withCredentials: true
        }
      );
      let docData = response.data;
      console.log(docData);
      let document = docData.document;
      let id = document._id;
      //   return <Redirect to="/editor" />;
      setDocname("");
      setNewDocPass("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDocument = async e => {
    e.preventDefault();
    console.log("in find doc to add");
    try {
      let response = await axios.post(
        "http://localhost:4000/addDocumentById",
        {
          id: findDocId,
          password: findDocPass
        },
        {
          withCredentials: true
        }
      );
      let docData = response.data;
      console.log(docData, "DOCDATA");
      setDocId("");
      setFindDocPass("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // let portals = getPortals();
    // setAllDocuments(portals);
    // console.log(allDocuments);
  }, [allDocuments]);
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
          <input
            type="password"
            name=""
            id=""
            placeholder="set document password"
            onChange={e => setNewDocPass(e.target.value)}
          />
          <button type="submit" onClick={e => handleNewDocument(e)}>
            Add!
          </button>
        </div>
        <div className="add-doc-container">
          <h2>Find a document to Add</h2>
          <input
            type="text"
            placeholder="document id to find.."
            onChange={e => setDocId(e.target.value)}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="password of target document.."
            onChange={e => setFindDocPass(e.target.value)}
          />
          <button type="submit" onClick={e => handleAddDocument(e)}>
            Find!
          </button>
        </div>
      </div>
      {/* {!allDocuments ? (
        <div>No Documents! yet!!</div>
      ) : (
        allDocuments.map(doc => {
          console.log(allDocuments);
          return <h4>{doc.title}</h4>;
        })
      )} */}
    </div>
  );
}
