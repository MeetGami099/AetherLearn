import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup";
import VerifyOtp from "./Pages/OTP/VerifyOtp";
import OpenRoute from "./Components/OpenRoute"
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />  
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/verify" element={<OpenRoute><VerifyOtp /></OpenRoute>} />

        <Route path="/student" element={<PrivateRoute>Hey Student</PrivateRoute>} />
      </Routes>
    </div>
  );
}
