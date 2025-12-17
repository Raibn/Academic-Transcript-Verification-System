// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import IssueTranscript from './pages/IssueTranscript';
import VerifyTranscript from './pages/VerifyTranscript'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<h2>Welcome to the Academic Transcript System</h2>} />
          <Route path="/issue" element={<IssueTranscript />} />
          <Route path="/verify" element={<VerifyTranscript />}/>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
