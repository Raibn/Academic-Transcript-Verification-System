// src/pages/VerifyTranscript.js
import React, { useState } from 'react';
import { web3, contract } from '../services/web3';
import './VerifyTranscript.css';
import { toast } from 'react-toastify';

const VerifyTranscript = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [transcripts, setTranscripts] = useState([]);

  const handleVerify = async (event) => {
    event.preventDefault();
        // Validate admission number to be 4 digits
    const admissionNumberPattern = /^\d{4}$/;
    if (!admissionNumberPattern.test(admissionNumber)) {
      toast.error('Admission number must be exactly 4 digits.');
      return;
    }
  
    try {
      const result = await contract.methods.getTranscripts(admissionNumber).call();
      if (result.length == 0) {
        toast.error('No trascript found for this admission number.');
      } else {
        setTranscripts(result);
        toast.success('Transcript found and verified.');
      }
    } catch (error) {
      toast.error('Failed to verify transcript.');
      console.error("Error fetching transcripts:", error);
    }
  };



  return (
    <div className="container">
      <h2>Verify Transcript</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter Admission Number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          required
        />
        <button type="submit">Verify Transcript</button>
      </form>
      {transcripts.length > 0 && (
        <div>
          <h3>Transcripts:</h3>
          <ul>
            {transcripts.map((transcript, index) => (
              <li key={index}>
                <p>First Name: {transcript.firstName}</p>
                <p>Middle Name: {transcript.middleName}</p>
                <p>Last Name: {transcript.lastName}</p>
                <p>Admission Number: {transcript.admissionNumber}</p>
                
                <p>IPFS Hash: <a href={`http://127.0.0.1:8080/ipfs/${transcript.ipfsHash}`} target="_blank" rel="noopener noreferrer">{transcript.ipfsHash}</a></p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VerifyTranscript;
