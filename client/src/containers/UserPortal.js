import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Redirect, Link } from "react-router-dom";

export default function UserPortal() {
  const [docname, setDocname] = useState("");
  const [newDocPass, setNewDocPass] = useState("");

  const [findDocId, setDocId] = useState("");
  const [findDocName, setFindDocName] = useState("");
  const [findDocPass, setFindDocPass] = useState("");

  const [allDocuments, setAllDocuments] = useState([]);

  const getDocuments = async () => {
    try {
      let response = await axios.get("http://localhost:4000/portals",{
        withCredentials: true
      });
      let content = response.data;
      //console.log(response);
      if(!content.success){
        console.log('failed to get documents');
      } else {
        console.log('documnets', content.documents)
        setAllDocuments(content.documents);
        console.log('alldocs', allDocuments)
      }
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
      //   console.log("THIS IS RESPON", response);
      //   console.log(response.data, "RESPONSE");
      let docData = response.data;
      //   return <Redirect to="/editor" />;
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddDocument = async e => {
    e.preventDefault();
    console.log("in find doc to add");
    // console.log(findDocId);
    // console.log(findDocPass);
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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDocuments();
    console.log(allDocuments);
  }, []);

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
      {!allDocuments.length ? (
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
