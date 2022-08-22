const WavePortal= artifacts.require("WavePortal");
let wavePortal;
contract('Testing Contract...',(accounts)=>{
    beforeEach(async()=>{
        wavePortal= await WavePortal.deployed();

        console.log("Hurrahhhh.. First Smart Contract Deployed ");
        console.log("Contract Deployed on :",wavePortal.address);
        // console.log(wavePortal.currentProvider);
    })

    it('Deploying...',async ()=>{
        const admin= await wavePortal.admin();
        console.log(admin);
    })
    it('Should check wave is uploaded',async ()=>{
         await wavePortal.wave("Hey !! Neeraj choubisa",{value:100,from:accounts[2],gas:'1000000'});

    });

    it('Should give wave',async()=>{
        let x= await wavePortal.waves(0);
        console.log(x);
    })

    it('Should give all waves present in wave buildspace',async ()=>{
        const x= await wavePortal.getAllWaves();
        console.log(x)
    })
})