import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import PrivateRoute from "./components/authentication/PrivateRoute";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import Dashboard from "./components/Dashboard";
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
              <PrivateRoute exact path="/" component={Dashboard}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
