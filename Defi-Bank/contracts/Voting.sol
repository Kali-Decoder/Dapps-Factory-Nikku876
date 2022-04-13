// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.26;

contract Election{
    address public Ec;

    struct Candidate{
        uint id;
        string name;
        string symbol;
        string candidateName;
        uint votecount;
    }
    uint public candidatesCount;
    
    constructor(){
        Ec= msg.sender;
    }
    
    mapping(uint=>Candidate) public candidates;

    mapping(address=>bool) public checkForDualCandidate;
    
    event update(uint id,
        string name,
        string symbol,string candidateName,
        uint votecount);
    
    function addCandidate(string memory _name,string memory _symbol,string memory _candidateName)  public onlyOwner   {
        candidatesCount++;
        candidates[candidatesCount]=Candidate(candidatesCount,_name,_symbol,_candidateName,0);
        
    }

   
    function Vote(uint _id) public returns(bool){
        //the person not voted again
        require(!checkForDualCandidate[msg.sender],"You Can't Vote");
        require(candidates[_id].id!=0,"The Candidate is Not Exist !!!");


        //increase vote count and change boolean value to ture;
        candidates[_id].votecount++;
        checkForDualCandidate[msg.sender]=true;
        emit update(_id,candidates[_id].name,candidates[_id].symbol,candidates[_id].candidateName,candidates[_id].votecount);
        return true;
    }

    modifier onlyOwner(){
        require(msg.sender==Ec,"You Are Not Election Commisson");
        _;
    }
    
}