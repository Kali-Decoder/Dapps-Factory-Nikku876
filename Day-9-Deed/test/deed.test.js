const Deed= artifacts.require('Deed');
let deedContract;
contract('Deed testing..',()=>{
    beforeEach(async ()=>{
        deedContract = await Deed.deployed();
    });

    it('Should show address of lawyer',async()=>{
        console.log(deedContract);
    })

    it('should show beneficiary address',async ()=>{
        
    })

})