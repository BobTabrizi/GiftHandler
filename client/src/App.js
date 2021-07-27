import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import "./App.css";
import { useSelector } from "react-redux";
import { history } from "./helpers/history";
import { GroupPage } from "./Pages/GroupPage";
import PrivateRoute from "./Routes/PrivateRoute";
import { ManageGroup } from "./Pages/ManageGroup";
import { UserGroupPage } from "./Pages/UserGroupPage";
import { ProfilePage } from "./Pages/ProfilePage";
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
          <Route path="/groups/:id" component={GroupPage} />
          <Route path="/passwordReset/:id" component={PasswordReset} />

          <PrivateRoute
            path="/welcome"
            isAuthenticated={isAuthenticated}
            component={FTUE}
          />
          <PrivateRoute
            path="/managegroups"
            isAuthenticated={isAuthenticated}
            component={ManageGroup}
          />
          <PrivateRoute
            path="/profile"
            isAuthenticated={isAuthenticated}
            component={ProfilePage}
          />
          <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
            component={Dashboard}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
