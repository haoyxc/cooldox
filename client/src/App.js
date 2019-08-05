import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Draft from "./components/Draft";
import Register from "./containers/Register";
import DocumentEditor from "./containers/DocumentEditor";
import UserPortal from "./containers/UserPortal";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login}/>
        <Route path="/portal" exact component={UserPortal} />
        <Route path="/editor" exact component={UserPortal}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
