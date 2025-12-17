// src/services/ipfs.js
import { create } from 'ipfs-http-client';


//const IPFS = require('ipfs-http-client');

// Replace 'YOUR_INFURA_PROJECT_ID' and 'YOUR_INFURA_PROJECT_SECRET' with actual values
// const projectId = 'YOUR_INFURA_PROJECT_ID';
// const projectSecret = 'YOUR_INFURA_PROJECT_SECRET';
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
//  



// Connect to IPFS
const ipfs = create({ 
    host: '127.0.0.1', 
    port: '5001', 
    protocol: 'http' ,
    // headers: {mode: 'no-cors'}

});

export default ipfs;

       