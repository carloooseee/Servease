import React from "react";
import "../css/home.css"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Tempbg from "../images/tempbg.jpg";

function Home() {
  return (
    <div className="home">
      <div className="content">
        <h1>Welcome to ServEase</h1>
        <p>Your trusted service provider</p>
      </div>
    </div>
  );
}

function Body(){
    
}

function Background() {
return(
  <div className="background">
    <img src="Tempbg.jpg" alt="background"/>
  </div>
);
}
export default Home;