import React from 'react'
import { useState } from 'react';
import SideBar from './componenets/SideBar'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContect from './componenets/MainContect';
import ProtectedRoute from './componenets/ProdectRoute';
import Login from './Pages/Login';
import SingUp from './Pages/SingUp';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (

    <Router>
    <div className="flex h-screen mx-5">
      <SideBar />
      <div className="w-full p-5">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SingUp setIsAuthenticated={setIsAuthenticated} />} />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MainContect />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  </Router>
);
};

  

export default App