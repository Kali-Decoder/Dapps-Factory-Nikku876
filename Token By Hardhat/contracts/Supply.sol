// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract DAO{
// Making a dao contract for startups 
    address public manager;// address of manager that is organise this organisation 
    mapping(address=>bool) public investors;// Mapping to ensure weather it is invester or not in our organisation
    mapping(address=>uint) public shares;//mapping how many shares hold by an investor 
    uint public totalShares;// total shares company has 
    uint public remainingShares;// remaining shares company has 
    uint public contributionEnd;// Contribution end time 
    //create Investment proposal  for startup 
    struct Proposal{
        uint id;
        string name;
        uint amount;
        address payable to;
        uint votes;
        uint end;
        bool executed;
    }
    // storing all proposals 
    mapping(uint=>Proposal) public proposals;
    // increament proposal id or store id 
    uint public nextId;
    // who is voting => on what proposal =? voted or not 
    mapping(address=>mapping(uint=>bool)) public votes;
    // no of votes 
    uint public votesTime;
    // noof peoples can votes in proposals
    uint public quorum;
    
    // initialize primary details at the time of deploy of smart contract  
    constructor(uint contributeTime,uint _voteTime,uint _quorum){
        require(_quorum>0 && _quorum<100 ,"Please enter valid Quorum");
        manager=msg.sender;
        contributionEnd=contributeTime+block.timestamp;
        votesTime=_voteTime;
        quorum=_quorum;
    } 

    // Contribute Shares 
    // 
    function contribute() payable external {
        require(block.timestamp<contributionEnd,"Time Is over");
        investors[msg.sender]=true;
        shares[msg.sender]+=msg.value;
        totalShares+=msg.value;
        remainingShares+=msg.value;
    }

    //Reedeming Shares
    function redeemShare(uint amount) external {
        
         require(shares[msg.sender]>=amount,"No that much shares in your portfolio");
         require(remainingShares>=amount,"Not Available ");
         shares[msg.sender]-=amount;
         remainingShares-=amount;
         payable(msg.sender).transfer(amount);
         
    }
    // transfering shares from one account to another account by this fucntion 
    function transferShare(uint amount,address to) external {
        require(shares[msg.sender]>=amount,"No that much shaers in your portfolio");
        shares[msg.sender]-=amount;
        shares[to]+=amount;
        investors[to]=true;

    }

    // creating proposal for startup on blockchain 

    function createProposal(string memory name ,uint amount, address payable to) external onlyInvestor(msg.sender) {
        require(remainingShares>=amount,"Not enough shares");
        Proposal memory newProposal = Proposal({
            id:nextId,
            name:name,
            amount:amount,
            to:to,
            votes:0,
            end:block.timestamp+votesTime,
            executed:false

        });

        proposals[nextId]=newProposal;
        remainingShares-=amount;
        nextId++;
    }
    // vote for proposal if it is investor in organisation
    function voteProposal(uint id) external onlyInvestor(msg.sender)  {
       
        require(votes[msg.sender][id]==false,"You cannot vote double time ");
        require(block.timestamp<proposals[id].end,"Proposal is  end");
        votes[msg.sender][id]=true;
        proposals[id].votes+=shares[msg.sender];
    }
   

    //successfull investment prposal if all the require statements are true then this function is excuted and proposal is successfully proceed

   function executeProposal(uint id) external onlyAdmin(){
       Proposal storage newProposal= proposals[id];
       require(block.timestamp>=newProposal.end,"Not Be executed");
       require(newProposal.executed==false,"Proposal already executed");
       require(100*(newProposal.votes/totalShares)>=quorum,"Condition is true " );

       _transferEther(newProposal.amount,newProposal.to);
   }


   function withdrawEther(uint amount,address payable to) external onlyAdmin() {
       _transferEther(amount,to);
   }

   function _transferEther(uint amount,address payable to) internal  {
       require(amount<=remainingShares,"Not Enough Balance");
         remainingShares-=amount;
         to.transfer(amount);
   }

    receive() payable external {
        remainingShares+=msg.value;
    }

    //Modifiers use to redife the function defination and functioning of function
    modifier onlyInvestor(address x){
        require(investors[x]==true,"You are not an investor");
        _;
    }
    modifier onlyAdmin(){
        require(msg.sender==manager,"Only admin can perform this function");
        _; 
    }
}