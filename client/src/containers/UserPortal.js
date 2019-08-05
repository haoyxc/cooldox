import React from "react";

export default function UserPortal() {
  const getPortals = async () => {
    try {
      let response = await axios.get("/portals");
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return <div>hello this is the userportal</div>;
}
