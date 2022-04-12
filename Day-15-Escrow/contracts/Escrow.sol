// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;
contract Escrow{
    address public payer;
    address payable public payee;
    address public lawyer;
    uint public amount;

    constructor(address _payer,address _payee,uint _amount){
        payer=_payer;
        payee=payable(_payee);
        lawyer=msg.sender;
        amount=_amount;
    }

    function deposit() public payable{
        require(msg.sender==payer,"Money is giving only by payer");
        require(address(this).balance<=amount,"amount condition");
    }

    function release() public {
        require(address(this).balance==amount,"Amount transfer to payee");
        require(msg.sender==lawyer,"Lawyer only can perform this function");

        payee.transfer(address(this).balance);
    }

    function balanceOf() public view returns(uint){
        return address(this).balance;
    }
}