import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Dashboard } from "./Pages/Dashboard";
import "./App.css";
import { useSelector } from "react-redux";
import { history } from "./helpers/history";
import { GroupPage } from "./Pages/GroupPage";
import PrivateRoute from "./Routes/PrivateRoute";
import { ManageGroup } from "./Pages/ManageGroup";
import { UserPage } from "./Pages/UserPage";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/groups/:id" component={GroupPage} />
          <Route path="/users/:id" component={UserPage} />
          <PrivateRoute
            path="/managegroups"
            isAuthenticated={isAuthenticated}
            component={ManageGroup}
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
