import React from "react";
import axios from "axios";

export default function UserPortal() {
  const getPortals = async () => {
    try {
      let response = await axios.get("/portals");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button>New Document</button>
      hello this is the userportal
    </div>
  );
}
