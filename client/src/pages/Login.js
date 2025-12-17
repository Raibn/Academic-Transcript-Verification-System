// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        admissionNumber,
        password,
      });
      localStorage.setItem('token', response.data.token); // Store JWT token
      alert('Login successful!');
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed!");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Admission Number"
        value={admissionNumber}
        onChange={(e) => setAdmissionNumber(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
