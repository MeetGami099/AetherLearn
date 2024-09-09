import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Pages/Home/Home"
import LoadingSpinner from "./Spinner"; 
import Login from "./Pages/Login/Login"
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const renderUser = () => {
    return <div>User Content</div>;
  };

  return (
    <div className="App">
      <Navbar />
      <Login />
      {/* 
      {isLoading ? <LoadingSpinner /> : renderUser()}
      {errorMessage && <div className="error">{errorMessage}</div>} */}
      
    </div>
  );
}
