// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav>
      <h2>Academic Transcript System</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/issue">Issue Transcript</Link></li>
        <li><Link to="/verify">Verify Transcript</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

