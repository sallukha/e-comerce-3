import React from 'react'
import SideBar from './componenets/SideBar'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContect from './componenets/MainContect';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SingUp from './Pages/SingUp';
const App = () => {
  return (

    <Router>
    <div className="flex h-screen mx-5">
      <SideBar />
      <div className="w-full p-5">
        <Routes>
          <Route path="/" element={<MainContect />} /> {/* Changed to render Home */}
        
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<SingUp />} />
        </Routes>
      </div>
    </div>
  </Router>
  )
}

export default App