import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import System from "./components/System";
import "./App.css";
export default function App (){

    return (
      <>
        <NavBar/>
        <div className="flex_center" style={{minHeight: "100vh",width:"100vw"}}>
          <System/>
        </div>
        <Footer/>
      </>
    );
  
}

