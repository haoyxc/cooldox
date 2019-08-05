import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Draft from "./components/Draft";
import Register from "./containers/Register";

function App() {
  return (
    <BrowserRouter>
      <Route to="/register" component={Register} />
      <Route to="/portal" exact={true} component={Draft} />
    </BrowserRouter>
  );
}

export default App;
