const fs= require('fs-extra');
const path= require('path');
const solc= require('solc');

const buildPath= path.resolve(__dirname,'build');
//agar build folder hoga toh yeh remove kr dega
fs.removeSync(buildPath);

const campaignPath= path.resolve(__dirname,'contracts','Campaign.sol');
// console.log(campaignPath)
const source= fs.readFileSync(campaignPath,'utf8');

// console.log(source)

const output= solc.compile(source).contracts;
// console.log(output);
//agar build folder nhi hoga toh yeh bana dega 
fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':','') +'.json'),
        output[contract]
    )
}


