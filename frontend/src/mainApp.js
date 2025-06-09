import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import App from "./App";

const MainApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/user/signup" />
        } />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/tasks" element={
          isAuthenticated ? <App /> : <Navigate to="/user/signin" />
        } />
      </Routes>
    </Router>
  );
};

export default MainApp;
