// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import './Election.sol';
contract ElectionFactory{
    struct ElectionDetail{
        address deployedAddress;
        string ename;
        string edesc;
    }

    mapping(string=>ElectionDetail) elections;

    function createElection(string calldata _email,string calldata _name,string calldata _desc) public {
        Election newElection = new Election(msg.sender,_name,_desc);
        elections[_email]=ElectionDetail(address(newElection),_name,_desc);
    }

    function getDeployedElection(string calldata _email) public view returns(ElectionDetail memory){
        ElectionDetail memory _election = elections[_email];
        address val = _election.deployedAddress;
        require(val!=address(0),"Election not exist");
        return _election;
    }
}