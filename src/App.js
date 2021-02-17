import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/authentication/PrivateRoute";
import Home from "./components/Home";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import ForgotPassword from "./components/authentication/ForgotPassword";
import Dashboard from "./components/authentication/Dashboard";
import UpdateProfile from "./components/authentication/UpdateProfile";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <Container 
      className="d-flex align-items-center justify-content-center" 
      style={{ minHeight : "100vh" }}>
      <div className="w-100" style={{ maxWidth : '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Home}/>
              <PrivateRoute path="/dashboard" component={Dashboard}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
