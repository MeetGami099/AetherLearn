import React from "react";
import "./Navbar.css";
import logoImage from "./assets/aetherlearn-high-resolution-logo-white-transparent.png"; // Ensure this path is correct

export default function Navbar() {
  return (
    <nav className="navbar">
      <img  src={logoImage} alt="Logo" className="logo" />
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}
