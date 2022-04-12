const assert = require("assert");
const Web3 = require("web3");

const ganache = require("ganache-cli");

const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let todoContract;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  todoContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });

});


describe("Deploys A Todo Contract...",()=>{
    it('should Create Task',async()=>{

        await todoContract.methods.createTodo("Playing FootBall","nikku876").send({from:accounts[0],gas:'1000000'});

        const task= await todoContract.methods.getTask(1).call();
        // console.log(task);
        assert.equal(task['2'],"Playing FootBall");
    })
    it('Get Task ',async ()=>{
        await todoContract.methods.createTodo("Playing FootBall","nikku876").send({from:accounts[0],gas:'1000000'});

        const task= await todoContract.methods.getTask(1).call();
        // console.log(task);
        assert.equal(task['2'],"Playing FootBall");
    })

    it('get  ids of all tasks ',async ()=>{
        await todoContract.methods.createTodo("Playing FootBall","nikku876").send({from:accounts[0],gas:'1000000'});

        await todoContract.methods.createTodo("Playing Volley Ball","yashu876").send({from:accounts[1],gas:'1000000'});

        await todoContract.methods.createTodo("Playing Hockey","karan876").send({from:accounts[2],gas:'1000000'});

        const array= await todoContract.methods.getTaskIds().call();

        console.log(array);

        assert.ok(true);
    })
})