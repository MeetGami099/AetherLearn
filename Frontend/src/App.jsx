import React, { useState } from "react";
import LoadingSpinner from "./Spinner"; // Ensure this path is correct
import Navbar from "./Navbar";
import "./App.css";
import Player2 from "./Pages/player/Player2";

export default function App() {
  const [isLoading, setIsLoading] = useState(true); // Set to true to see the spinner
  const [errorMessage, setErrorMessage] = useState("");

  const renderUser = () => {
    return <div>User Content</div>;
  };

  return (
    <div className="App">
      {/* <Navbar />
      {isLoading ? <LoadingSpinner /> : renderUser()}
      {errorMessage && <div className="error">{errorMessage}</div>} */}
      <Player2 />
    </div>
  );
}
