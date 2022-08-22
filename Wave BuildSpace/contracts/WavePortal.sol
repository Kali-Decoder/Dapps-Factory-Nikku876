// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
contract WavePortal{
    address public admin;
    uint public numWaves;
    uint minFees=100 wei;
    mapping(address=>uint) public countWaves;
    struct Wave{
        address waver;
        string msg;
        uint createdAt;
        
    }
    event NewWave(address indexed from, string msg,uint date);
    Wave[] public waves;

    constructor(){
        admin=msg.sender;
    }

    function wave(string memory _str) payable public minimumFee(msg.value) returns(bool){
        numWaves++;
        payable(admin).transfer(msg.value);
        waves.push(Wave(msg.sender,_str,block.timestamp));
        countWaves[msg.sender]++;
        emit NewWave(msg.sender,_str,block.timestamp);
        
        return true;
    }
    
    function getAllWaves() view public returns(Wave[] memory){
        return waves;
    }

    modifier minimumFee(uint x){
        require(x==minFees,"Condition not satisfied ");
        _;
    }

    
}