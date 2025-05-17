import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/app.css";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Services from "./components/Services";
import Become from "./components/Become";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EmployeeProfile from "./components/EmployeeProfile";
import Map from "./components/Map";
import Footer from "./components/Footer";
import TestDropdown from "./components/TestDropdown";


function App() {
  const [user, setUser] = useState(null); 
  return (
    <Router>
      <div className="app-container">
        <Navigation user={user} /> 
        
        <div className="box">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Become" element={<Become />} />
            <Route path="/Profile" element={<Profile user={user} />} />
            <Route path="/EmployeeProfile" element={<EmployeeProfile user={user} />} />
            <Route path="/Map" element={<Map/>}/>
          </Routes>
        </div>
        
      </div>
      {/* <Footer/> */}
      
    </Router>
  );
}

export default App;
