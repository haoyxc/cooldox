import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Draft from "../components/Draft";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DocumentEditor({ match }) {
  //   const [docId, setDocId] = useState("");
  const [document, setDocument] = useState(null);

  useEffect(() => {
    // console.log(id);
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
    // console.log(resp.data);
    if (resp.data.success) {
      setDocument(resp.data.document);
    }

    // console.log(responseFetch, "FETCH");
  };

  return (
    <div>
      <Navbar />
      {document ? (
        <div className="doc-editor-container">
          <h3>{document.title}</h3>
          <Draft document={document} />
        </div>
      ) : (
        <div className="doc-editor-container">Document not found sorry dude</div>
      )}
    </div>
  );
}
