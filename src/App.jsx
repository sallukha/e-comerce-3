import React from 'react'
import SideBar from './componenets/SideBar'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContect from './componenets/MainContect';
 
const App = () => {
  return (

    <Router>
      <div className="flex h-screen mx-5">

        <SideBar />

        <div className="w-full p-5">

          <Routes>

            <Route path="/" element={<MainContect />} />

            
          </Routes>
           
        </div>
      </div>
    </Router>
  )
}

export default App