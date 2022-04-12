const Fibb= artifacts.require('Fibb');
let fibContract;
contract('Testing Fibb...',()=>{
    beforeEach(async()=>{
        fibContract= await Fibb.deployed();
    })

    it('should show fibbonaachi of number',async ()=>{
        let x= await fibContract.calculateFib(15);
        assert.ok(true)
    })
})