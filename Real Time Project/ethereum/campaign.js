import web3 from './web3';
const Campaign = require("./build/Campaign.json");

const campaignDeploy = (address) => {
  return new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};

export default campaignDeploy;
