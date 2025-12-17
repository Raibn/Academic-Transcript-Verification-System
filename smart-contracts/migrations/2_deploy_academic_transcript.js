// migrations/2_deploy_academic_transcript.js
const AcademicTranscript = artifacts.require("AcademicTranscript");

module.exports = function (deployer) {
  deployer.deploy(AcademicTranscript);
};
