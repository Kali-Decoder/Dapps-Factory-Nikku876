const String= artifacts.require('String');
let stringContract;
contract('String contract Testing...',()=>{
    beforeEach(async()=>{
        stringContract=await String.deployed();

    })

    it('Should Return length of string ',async ()=>{
        let getLength= await stringContract.toGetLength("Neeraj");
        console.log(getLength.toNumber());
        assert.equal(getLength,6);
        console.log(stringContract.address);
    })

    it('Should give concate string ',async ()=>{
        let conCatStr= await stringContract.concatenationString("nee","raj");
        // conCatStr=conCatStr.toString();
        
        assert.equal(conCatStr[0],"neeraj");
        assert.equal(conCatStr[1].toNumber(),6);
    })

    it('Should reverse string ',async()=>{
        let rverse= await stringContract.reverseString("lola");
        rverse= rverse.replace(/\0.*$/g,'');
        assert.equal(rverse,"alol");
    })
})