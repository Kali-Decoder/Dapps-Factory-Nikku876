const EventContract= artifacts.require("EventContract");
let eventContract;
contract('Testing Day-17 contract ',(accounts)=>{
    beforeEach(async ()=>{
        eventContract= await EventContract.deployed();
    });

    it('Should Create Event ',async ()=>{
        await eventContract.createEvent("Neeraj Choubisa","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ1uuUOjoz4xB0DjRwNiJHyJBcJPIvtQsCpA&usqp=CAU",9079257904,30000,150,150*60*60);

        let array= await eventContract.events(0);
        assert.equal(array[7],150);
    });

    it('Customer should Buy Film Tickets ',async ()=>{
        let array= await eventContract.events(0);
        let x1= array[7];
        await eventContract.buyTicket(0,10,{from:accounts[1],value:'300000'});

        array= await eventContract.events(0);
        let x2= array[7];

        assert.ok(x2<x1);

    });

    it('Should transfer tickets from one account to other ',async ()=>{
        let x1= await eventContract.viewrs(accounts[1],0);
        console.log(x1)
        await eventContract.transferTickets(0,5,accounts[3],{from:accounts[2]});

        let x2= await eventContract.viewrs(accounts[1],0);
        console.log(x2)
    });

    
})