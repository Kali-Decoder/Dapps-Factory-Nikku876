const Airbnb= artifacts.require("Airbnb");
let airbnbContract;
let address;
contract('Testing Contract ',(accounts)=>{
    beforeEach(async ()=>{
        airbnbContract= await Airbnb.deployed();
        address= airbnbContract.address;
    });

    it('Should rentOutproperty ',async ()=>{
        let amount = await web3.utils.toWei('50');//50 wei for one day
        await airbnbContract.rentOutproperty("Jagdish Villa","House No. 45 ,Titdi ,Sector 12 ,Udaipur Rajasthan",amount,{from:accounts[0],gas:'1000000'});

        let array = await airbnbContract.properties(0);
        assert.equal(array.name,"Jagdish Villa");
    });

    it('should rentProperty ',async ()=>{
        let array = await airbnbContract.properties(0);
        let id = array.id;
        let amount =(array.date.toNumber()-10-array.date.toNumber()+100000)/(24*60*60);
        amount*=50;

        await airbnbContract.rentProperty(id,array.date.toNumber()-10,array.date.toNumber()+100000,{from:accounts[3],value:amount,gas:'1000000'});
        let x= await airbnbContract.bookings(0);
        console.log(x);
    })
});