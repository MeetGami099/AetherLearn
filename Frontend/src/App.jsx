import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup";
import VerifyOtp from "./Pages/OTP/VerifyOtp";
import OpenRoute from "./Components/OpenRoute"
import PrivateRoute from "./Components/PrivateRoute";
import Dashboard from "./Layout/StudentDashboard/Dashboard";
import Player from "./Pages/VideoPlayer/Player";
import UploadVideo from "./Pages/UploadVideo/UploadVideo";
import UploadPost from "./Pages/UploadPost/UploadPost";

//Pages Imports
import ClassList from "./Pages/ClassList/ClassList";
import ClassroomOwner from "./Pages/ClassroomOwner/ClassroomOwner";

export default function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/verify" element={<OpenRoute><VerifyOtp /></OpenRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="/dashboard" element={<ClassList />} />

            <Route path="/dashboard/own/:classroomID" element={<ClassroomOwner />} >
            <Route path="/dashboard/own/:classroomID/posts" element={<UploadPost />} />
              <Route path="/dashboard/own/:classroomID/video" element={<UploadVideo />} />
            </Route>

        </Route>
        
        <Route path="/test" element={<Player />} />

      </Routes>
    </div>
  );
}
