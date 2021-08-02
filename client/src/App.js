import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Login } from "./Pages/Login";
import "./App.css";
import { useSelector } from "react-redux";
import { history } from "./helpers/history";
import PrivateRoute from "./Routes/PrivateRoute";
import { UserGroupPage } from "./Pages/UserGroupPage";
import { HomePage } from "./Pages/HomePage";
import { PasswordReset } from "./Pages/PasswordReset";
import { FTUE } from "./Pages/FTUE";
import { SpecialGroupPage } from "./Pages/SpecialGroupPage";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />

          <Route
            path="/groups/:GID/event/users/:UID"
            component={SpecialGroupPage}
          />
          <Route
            path="/groups/:gid/users/:id"
            exact
            component={UserGroupPage}
          />
          <Route path="/passwordReset/:id" component={PasswordReset} />

          <PrivateRoute
            path="/welcome"
            isAuthenticated={isAuthenticated}
            component={FTUE}
          />
          <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
            component={HomePage}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
