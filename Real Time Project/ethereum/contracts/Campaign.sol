// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.26;
contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign= new Campaign(minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampains() public view returns(address[] memory){
        return deployedCampaigns;
    }

}



contract Campaign{

    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        //above all variable are value types variable
        mapping(address=>bool) approvals;

    }
    Request[] public requests;

    modifier restricted(){
        require(msg.sender==manager);
        _;

    }
    constructor(uint minimum,address creator) {
        manager= creator;
        minimumContribution=minimum;

    }
    function contribute() public payable{
        require(msg.value>= minimumContribution);
        approvers[msg.sender]=true;
        approversCount++;
    }

    function createRequest(string memory description,uint value,address recipient) public restricted {
        
        Request memory newRequest= Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount:0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint idx) public {
        //requests array me se ek request uthayeng or usko approve krna h ya nhi votes pe depend krega
        
        require(approvers[msg.sender]);
        require(!requests[idx].approvals[msg.sender]);
        requests[idx].approvals[msg.sender]=true;
        requests[idx].approvalCount++;
    }

    function finalizeRequest(uint idx) public restricted{
            require(!requests[idx].complete);
            require(requests[idx].approvalCount>approversCount/2);
            requests[idx].recipient.transfer(requests[idx].value);
            requests[idx].complete=true;
    }
    function getSummary() public view returns(uint,uint,uint,uint,address){
        return(minimumContribution,this.balance,requests.length,approversCount,manager);
    }
    function getRequestCount() public view returns(uint){
        return(requests.length);
    }
}