// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Deed{
    // address public lawyer;
    // address payable public beneficiary;
    // uint public  time;

    // constructor(address _lawyer , address payable _beneficiary,uint fromNow)  payable {
    //     lawyer=_lawyer;
    //     beneficiary=_beneficiary;
    //     time= block.timestamp + fromNow;    
    // }

    // function transferFund() public {
    //     require(msg.sender==lawyer," You are not lawyer ");
    //     require(block.timestamp>=time," Time limit exceed ");

    //     beneficiary.transfer(address(this).balance);
    // }

    function getValue() pure public returns(string memory){
        return "Hello Worlds";
    }

}