import React from "react";
import Draft from "../components/Draft";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DocumentEditor() {
  return (
    <div>
      <Navbar />
      <Draft />
    </div>
  );
}
