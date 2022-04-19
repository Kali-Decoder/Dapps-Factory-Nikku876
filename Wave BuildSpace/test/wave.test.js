const WavePortal= artifacts.require("WavePortal");
let wavePortal;
contract('Testing Contract...',(accounts)=>{
    beforeEach(async()=>{
        wavePortal= await WavePortal.deployed();

        console.log("Hurrahhhh.. First Smart Contract Deployed ");
        console.log("Contract Deployed on :",wavePortal.address);
    })

    it('Deploying...',()=>{
        
    })
})