// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicTranscript {
    // Define a structure to hold the transcript details
    struct Transcript {
        string firstName;        // First name of the student
        string middleName;       // Middle name of the student (optional)
        string lastName;         // Last name of the student
        string admissionNumber;  // Student admission number
        // string courseOfStudy;    // Course of study
        // uint yearOfAdmission;    // Year of admission
        // uint yearOfGraduation;   // Year of graduation
        string ipfsHash;         // IPFS hash of the transcript file
        uint dateIssued;         // Timestamp of when the transcript was issued
        address issuedBy;        // Address of the institution that issued the transcript
    }

    // Mapping from student admission number to their transcripts
    mapping(string => Transcript[]) public transcripts;

    // Event to log when a transcript is issued
    event TranscriptIssued(
        string indexed admissionNumber,
        string firstName,
        string middleName,
        string lastName,
        string ipfsHash,
        uint dateIssued,
        address indexed issuedBy
    );

    // Function to issue a new transcript
    function issueTranscript(
        string memory admissionNumber,
        string memory firstName,
        string memory middleName,
        string memory lastName,
        // string memory courseOfStudy,
        // uint yearOfAdmission,
        // uint yearOfGraduation,
        string memory ipfsHash
    ) public {
        
        // Ensure the admission number is exactly 4 digits
        require(bytes(admissionNumber).length == 4, "Admission number must be exactly 4 digits.");

        // Create a new transcript object
        Transcript memory newTranscript = Transcript({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            admissionNumber: admissionNumber,
            // courseOfStudy: courseOfStudy,
            // yearOfAdmission: yearOfAdmission,
            // yearOfGraduation: yearOfGraduation,
            ipfsHash: ipfsHash,
            dateIssued: block.timestamp,
            issuedBy: msg.sender
        });


        // Add the transcript to the student's record using admission number
        transcripts[admissionNumber].push(newTranscript);

        // Emit an event to log the issuance of the transcript
        emit TranscriptIssued(admissionNumber, firstName, middleName, lastName, ipfsHash, block.timestamp, msg.sender);
    }

    // Function to retrieve all transcripts for a student by admission number
    function getTranscripts(string memory admissionNumber) public view returns (Transcript[] memory) {
        return transcripts[admissionNumber];
    }
}
