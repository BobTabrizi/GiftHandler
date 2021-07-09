import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Login } from "./Pages/Login";
import { Dashboard } from "./Pages/Dashboard";
import "./App.css";
import { Provider, connect, useSelector } from "react-redux";
import { history } from "./helpers/history";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <header className="App-header">
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute
              path="/"
              isAuthenticated={isAuthenticated}
              component={Dashboard}
            />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
