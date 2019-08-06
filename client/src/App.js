import React from "react";
import { BrowserRouter, Route, Switch, Link, Redirect} from "react-router-dom";
import "./App.css";
import Register from "./containers/Register";
import DocumentEditor from "./containers/DocumentEditor";
import UserPortal from "./containers/UserPortal";
import Login from "./containers/Login"

// making a private route function so the portal and editor routes are protected
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
  {...rest}
  render={props => localStorage.getItem("token")? (<Component {...props}/>):(<Redirect to={{pathname: "/login", state:{from: props.location}}}/>)}
  />
)

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login}/>
        <PrivateRoute path="/portal" exact component={UserPortal} />
        <PrivateRoute path="/editor" exact component={DocumentEditor}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
