import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Register from "./containers/Register";
import DocumentEditor from "./containers/DocumentEditor";
import UserPortal from "./containers/UserPortal";
import Login from "./containers/Login"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login}/>
        <Route path="/portal" exact component={UserPortal} />
        <Route path="/editor" exact component={DocumentEditor}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
