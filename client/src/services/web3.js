// src/services/web3.js
import Web3 from 'web3';
import AcademicTranscript from '../contracts/AcademicTranscript.json'; // Import the contract JSON file
import { toast } from 'react-toastify'; // You can use this or another notification library



let web3;
let contract;

const initWeb3 = async () => {
  // Check if MetaMask is installed
  if (window.ethereum) {
    web3 = new Web3(window.ethereum); // Initialize Web3 instance with MetaMask's provider
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        toast.error("User denied account access");
    }
  } else {
    toast.error("Non-Ethereum browser detected. Please install MetaMask!");
    return; // Exit if MetaMask is not installed
  }

  // Get the deployed network details
  const networkId = await web3.eth.net.getId();
  console.log("Network ID:", networkId);

  const deployedNetwork = AcademicTranscript.networks[networkId];
  if (!deployedNetwork) {
    toast.error("Smart contract not deployed to the detected network.");
    return null; // Prevent further execution if not deployed
  }

  // Create an instance of the contract
  contract = new web3.eth.Contract(
    AcademicTranscript.abi,
    deployedNetwork.address
  );
  console.log("Contract instance:", contract); // Debugging line
};

// Initialize web3 and the contract
initWeb3();

export { web3, contract };


