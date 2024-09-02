import React, { useState } from "react";
import Home from "./pages/Home/Home"
import LoadingSpinner from "./Spinner"; // Ensure this path is correct
import Navbar from "./Navbar";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // Set to true to see the spinner
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
