// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract QRGoat{

    address public admin;
    uint public constant basefees=1000 wei;
    string[] public websites;
    constructor(){
        admin= msg.sender;
    }
    uint public totalWebsites;
    mapping(address=>string) public secretWebsites;
    receive() external payable{}
    function addYourDarkWebsite(string memory _website) public payable returns(bool){
        totalWebsites++;
        require(msg.value==basefees,"To store Your Dark Websites fees");
        secretWebsites[msg.sender]=_website;// if already exist any website it will be overwrite 
        websites.push(_website);
        return true;
        
    }

    function eraseDarkWeb() public  {
        delete secretWebsites[msg.sender];
    }

    function getWebiste() view public returns(string memory){
        return secretWebsites[msg.sender];
    }


}