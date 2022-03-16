const SimpleSmartContract= artifacts.require('SimpleSmartContract');

contract('SimpleSmartContract',()=>{
    it('Should return Hello World !!!',async ()=>{
        const simpleSmartContract=await SimpleSmartContract.deployed();
        const result = await simpleSmartContract.helloWorld();
        console.log("Address Of Contact: ",simpleSmartContract.address);
        assert(result==='Hello World');

    })
}) 