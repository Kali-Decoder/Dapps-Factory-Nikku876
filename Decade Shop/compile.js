const fs= require('fs');
const path= require('path');
const solc= require('solc');
const marketPath= path.resolve(__dirname,'contracts','MarketPlace.sol');
const source= fs.readFileSync(marketPath,'utf8');

module.exports=(solc.compile(source,1).contracts[':MarketPlace']);

// console.log(solc.compile(source,1));