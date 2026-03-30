import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/index";
import RegisterForm from "./pages/RegisterForm/index";
import Dashboard from "./pages/Dashboard/index";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/registerForm" component={RegisterForm} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;