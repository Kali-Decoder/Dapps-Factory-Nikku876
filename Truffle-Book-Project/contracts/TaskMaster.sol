// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract TaskMaster {
    address public owner;
    string public name = "Hinata";
    string public symbol = "VC";
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = 10000; //10000 tokens for Todos
    }

    function reward(address doer, uint256 rewardAmount)
        public
        isOwner
        hasSufficientFunds(rewardAmount)
        returns (bool sufficientFunds)
    {
        balances[doer] += rewardAmount;
        balances[owner] -= rewardAmount;
        return sufficientFunds;
    }

    function getBalance(address addr) public view returns(uint){
        return balances[addr];
    }
    //modifiers
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier hasSufficientFunds(uint256 rewardAmount) {
        require(balances[msg.sender] >= rewardAmount);
        _;
    }
}
