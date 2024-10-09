import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup";
import VerifyOtp from "./Pages/OTP/VerifyOtp";
import OpenRoute from "./Components/OpenRoute"
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Layout/StudentDashboard/Dashboard";
import Player from "./Pages/VideoPlayer/Player";

//Pages Imports
import ClassList from "./Pages/ClassList/ClassList";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/verify" element={<OpenRoute><VerifyOtp /></OpenRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="/dashboard" element={<ClassList />} />
          <Route path="/dashboard/cerateClasses" element={<>You Change Route</>} />
        </Route>
        <Route path="/test" element={<Player />} />

      </Routes>
    </div>
  );
}
