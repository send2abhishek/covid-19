import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "./components/home/";
import Login from "./components/login";
import User from "./components/user";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

const OKTA_DOMAIN = "dev-6427851.okta.com";
const CLIENT_ID = "0oa7z12z7ei3V77QP5d5";
const CALLBACK_PATH = "/implicit/callback";

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://localhost:3000${CALLBACK_PATH}`;
const SCOPES = "openid profile email";

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scope: SCOPES.split(/\s+/),
};

function App(props) {
  function onAuthRequired() {
    props.history.push("/login");
  }
  return (
    <div>
      <Switch>
        <Security {...config} onAuthRequired={onAuthRequired}>
          <Route path="/" exact component={Home}></Route>
          <SecureRoute path="/user" exact component={User}></SecureRoute>
          <Route path={CALLBACK_PATH} exact component={LoginCallback} />
          <Route
            path="/login"
            exact
            render={() => <Login baseUrl="https://dev-6427851.okta.com" />}
          />
        </Security>
      </Switch>
    </div>
  );
}

export default withRouter(App);
