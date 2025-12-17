// src/pages/IssueTranscript.js
import React, { useState } from 'react';
import ipfs from '../services/ipfs';
import { web3, contract } from '../services/web3';
import { Buffer } from 'buffer'; // Import Buffer from the buffer package
import './IssueTranscript.css';
import { toast } from 'react-toastify'

const IssueTranscript = () => {
  const [bufferData, setBufferData] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  // const [courseOfStudy, setCourseOfStudy] = useState('');
  // const [yearOfAdmission, setYearOfAdmission] = useState('');
  // const [yearOfGraduation, setYearOfGraduation] = useState('');

  const captureFile = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onloadend = () => {
      setBufferData(Buffer.from(reader.result)); // Use Buffer to convert the array buffer
    };
  };


  const validateFields = () => {
    if (!firstName || !lastName || !admissionNumber ) {
      toast.error('Please fill in all required fields.');
      return false;
    }
  
    // Validate admission number to be 4 digits
    const admissionNumberPattern = /^\d{4}$/;
    if (!admissionNumberPattern.test(admissionNumber)) {
      toast.error('Admission number must be exactly 4 digits.');
      return false;
    }
  
    if (!bufferData) {
      toast.error('Please upload a transcript file.');
      return false;
    }
    
    return true;
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();

     // Validate form fields
    if (!validateFields()) return;
    try {
      // Upload file to IPFS
      const result = await ipfs.add(bufferData);
      setIpfsHash(result.path);
      console.log('IPFS Hash:', result.path);

      // Issue transcript on the blockchain
      const accounts = await web3.eth.getAccounts();
      console.log("Accounts:", accounts); // Log the accounts to verify MetaMask connection
      console.log("Contract:", contract); // Log the contract to verify contract instance

      await contract.methods
        .issueTranscript(
          admissionNumber,
          firstName,
          middleName,
          lastName,
          // courseOfStudy,
          // yearOfAdmission,
          // yearOfGraduation,
          result.path
        )
        .send({ from: accounts[0] });
      toast.success('Transcript issued successfully!');
    } catch (error) {
      toast.error("Error durring transaction:", error);
      console.error(`An error occurred while issuing the transcript: ${error.message}`);
    }
  };
 
  return (
    <div className="container">
      <h2>Issue Transcript</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Admission Number"
          value={admissionNumber}
          onChange={(e) => setAdmissionNumber(e.target.value)}
          required
        />
        <input type="file" onChange={captureFile} required />
        <button type="submit">Upload and Issue Transcript</button>
      </form>
      {ipfsHash && (
        <div>
          <p>IPFS Hash: {ipfsHash}</p>
          <a href={`http://127.0.0.1:8080/ipfs/${ipfsHash}`} target="_blank" rel="noopener noreferrer">
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

//<p>IPFS Hash: <a href={`http://127.0.0.1:8080/ipfs/${transcript.ipfsHash}`} target="_blank" rel="noopener noreferrer">{transcript.ipfsHash}</a></p>

export default IssueTranscript;
