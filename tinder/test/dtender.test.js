const DTinder = artifacts.require("DTinder");
let dtinder;

contract("Testing smart contract ...",(accounts)=>{
    beforeEach(async()=>{
        dtinder= await DTinder.deployed();
    });
    it("Should Give Tinder address",async()=>{
        console.log(dtinder.address);
    });
    it("user should register in tinder",async ()=>{
    
        await dtinder.register("Neeraj Choubisa","Udaipur",0,21 ,"www.nikku",{from:accounts[0]});//user one registration
        await dtinder.register("Yashu Choubisa","Delhi",0,22 ,"www.yashu",{from:accounts[1]});//user two registration
        await dtinder.register("Nikki Choubisa","Udaipur",1,21 ,"www.nikki",{from:accounts[2]});//user three registration
        await dtinder.register("Sneha Gupta","Delhi",1,21 ,"www.sneha",{from:accounts[3]});//user four registration

        const users= await dtinder.getMatchableUsers("Delhi",{from:accounts[2]});
        console.log(users);


    });

    it("User should left or right swipe",async ()=>{

        await dtinder.swipe(1,accounts[3],{from:accounts[0]});
        await dtinder.swipe(1,accounts[0],{from:accounts[3]});

    });


    it("Should message if both likes each other",async()=>{
        await dtinder.sendMessage("Hello, Nimki Daru peene chal rhe hai ",accounts[3],{from:accounts[0]});
    })
})