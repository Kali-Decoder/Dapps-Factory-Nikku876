// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Voting{

    address public owner;
    uint public nextId;
    constructor(){
        owner=msg.sender;
    }
    struct Candidate{
        uint id;
        string name;
        string symbol;
        string uri;
        uint vote;
        address uniqueID;
    }

    mapping(address=>bool) public voters;
    mapping(uint=>Candidate) public candidates;
    Candidate[] public candidateList;

    function registerCandidate(string memory _name,string memory _symbol ,string memory _uri,address _uniqueID) public onlyOwner alreadyRegister(_uniqueID) {
        candidates[nextId]=Candidate(nextId,_name,_symbol,_uri,0,_uniqueID);
        candidateList.push(Candidate(nextId,_name,_symbol,_uri,0,_uniqueID));
        nextId++;
    }
    function voting(uint id) public isVoted returns(bool){
        voters[msg.sender]=true;
        candidates[id].vote++;
        return true;
    }

    modifier isVoted(){
        require(voters[msg.sender]==false);
        _;
    }

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    modifier alreadyRegister(address _uniqueID){
        bool allowed=false;
        for(uint i=0;i<candidateList.length;i++){
            if(candidateList[i].uniqueID==_uniqueID){
                allowed=true;
            }
        }
        require(allowed==true);
        _;

        
    }

}