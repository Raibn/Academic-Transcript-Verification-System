// src/services/transcriptService.js
import web3 from './web3';
import AcademicTranscript from '../contracts/AcademicTranscript.json';

// Replace with the contract's deployed address
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

// Get the ABI from the JSON file
const CONTRACT_ABI = AcademicTranscript.abi;

// Create contract instance
const contractInstance = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

export const issueTranscript = async (studentAddress, studentName, ipfsHash, fromAddress) => {
  try {
    await contractInstance.methods
      .issueTranscript(studentAddress, studentName, ipfsHash)
      .send({ from: fromAddress });
    console.log("Transcript issued successfully!");
  } catch (error) {
    console.error("Error issuing transcript:", error);
  }
};

export const getTranscripts = async (studentAddress) => {
  try {
    const transcripts = await contractInstance.methods.getTranscripts(studentAddress).call();
    return transcripts;
  } catch (error) {
    console.error("Error retrieving transcripts:", error);
  }
};
