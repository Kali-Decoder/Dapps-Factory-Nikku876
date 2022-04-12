// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract DAO{

    address public manager;
    mapping(address=>bool) public investors;
    mapping(address=>uint) public shares;
    uint public totalShares;
    uint public remainingShares;
    uint public contributionEnd;
    //create Investment proposal 
    struct Proposal{
        uint id;
        string name;
        uint amount;
        address payable to;
        uint votes;
        uint end;
        bool executed;
    }

    mapping(uint=>Proposal) public proposals;
    uint public nextId;
    mapping(address=>mapping(uint=>bool)) public votes;
    uint public votesTime;
    uint public quorum;
    

    constructor(uint contributeTime,uint _voteTime,uint _quorum){
        require(_quorum>0 && _quorum<100 ,"Please enter valid Quorum");
        manager=msg.sender;
        contributionEnd=contributeTime+block.timestamp;
        votesTime=_voteTime;
        quorum=_quorum;
    } 

    // Contribute Shares 
    function contribute() payable external {
        require(block.timestamp<contributionEnd,"Time Is over");
        investors[msg.sender]=true;
        shares[msg.sender]+=msg.value;
        totalShares+=msg.value;
        remainingShares+=msg.value;
    }

    //Reedeming Shares
    function redeemShare(uint amount) external {
        
         require(shares[msg.sender]>=amount,"No that much shaers in your portfolio");
         require(remainingShares>=amount,"Not Available ");
         shares[msg.sender]-=amount;
         remainingShares-=amount;
         payable(msg.sender).transfer(amount);
         
    }

    function transferShare(uint amount,address to) external {
        require(shares[msg.sender]>=amount,"No that much shaers in your portfolio");
        shares[msg.sender]-=amount;
        shares[to]+=amount;
        investors[to]=true;

    }

    

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

    function voteProposal(uint id) external onlyInvestor(msg.sender)  {
       
        require(votes[msg.sender][id]==false,"You cannot vote double time ");
        require(block.timestamp<proposals[id].end,"Proposal is  end");
        votes[msg.sender][id]=true;
        proposals[id].votes+=shares[msg.sender];
    }
   

    //successfull investment prposal
   function executeProposal(uint id) external onlyAdmin() returns(bool){
       Proposal storage newProposal= proposals[id];
       require(block.timestamp>=newProposal.end,"Not Be executed");
       require(newProposal.executed==false,"Proposal already executed");
       require(100*(newProposal.votes/totalShares)>=quorum,"Condition is true " );

       _transferEther(newProposal.amount,newProposal.to);
       return true;
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

    //Modifiers
    modifier onlyInvestor(address x){
        require(investors[x]==true,"You are not an investor");
        _;
    }
    modifier onlyAdmin(){
        require(msg.sender==manager,"Only admin can perform this function");
        _; 
    }
}