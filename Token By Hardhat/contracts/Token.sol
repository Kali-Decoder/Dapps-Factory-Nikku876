// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract Token{
    string public name ="Neeraj Choubisa ";
    string public symbol = "NCT";
    address public owner;
    uint public totalSupply= 10000;
    mapping(address=>uint) public balances; 
    constructor(){
        owner= msg.sender;
        balances[owner]=totalSupply;
    }

    function sendToken(uint _requestToken,address to) external {
        require(balances[msg.sender]>=_requestToken,"Not enogh tokens");
        balances[msg.sender]-=_requestToken;
        balances[to]+=_requestToken;
    }

    function balanceOf() public view returns(uint){
        return balances[msg.sender];
    }
}