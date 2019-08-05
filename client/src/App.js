import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Draft from "./components/Draft";
import Register from "./containers/Register";

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Register} />
      <Route path="/portal" exact component={Draft} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
