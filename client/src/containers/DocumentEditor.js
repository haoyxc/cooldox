import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Draft from "../components/Draft";
import Navbar from "../components/Navbar";
import axios from "axios";
import io from "socket.io-client";

export default function DocumentEditor({ match }) {
  //   const [docId, setDocId] = useState("");
  const [document, setDocument] = useState(null);
  const [socket, setSocket] = useState(null);
  //   const socket = io("localhost:4000");

  useEffect(() => {
    // console.log(id);
    setSocket(io("http://localhost:4000"));
    getDocument();
  }, []);

  const getDocument = async () => {
    const resp = await axios.post(
      `http://localhost:4000/getEditor`,
      {
        id: match.params.id
      },
      {
        withCredentials: true
      }
    );
    if (resp.data.success) {
      setDocument(resp.data.document);
    }
  };

  return (
    <div>
      <Navbar />
      {document ? (
        <div className="doc-editor-container">
          <h3>{document.title}</h3>
          <Draft document={document} docId={match.params.id} socket={socket}/>
          <p>Sharable id: {match.params.id}</p>

        </div>
      ) : (
        <div className="doc-editor-container">Document not found sorry dude</div>
      )}
    </div>
  );
}
