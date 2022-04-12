// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract MultiWallet {
    address[] public approvers;
    uint256 public quorum;
    uint256 nextId;
    mapping(uint256 => Transfer) public transfers;
    mapping(address => mapping(uint256 => bool)) public approvals;
    struct Transfer {
        uint256 id;
        address payable recepient;
        uint256 amount;
        uint256 numberOfApprovers;
        bool sent;
    }

    constructor(address[] memory _approvers, uint256 _quorum) payable {
        approvers = _approvers;
        quorum = _quorum;
    }

    function createTransfer(uint256 _amount, address payable to) external onlyApprover() {
        transfers[nextId] = Transfer(nextId, to, _amount, 0, false);
        nextId++;
    }

    function sendTransaction(uint256 id) external onlyApprover() {
        require(transfers[id].sent == false, "You Have Already paid");
        if (transfers[id].numberOfApprovers >= quorum) {
            transfers[id].sent = true;
            address payable to = (transfers[id].recepient);
            uint256 amount = transfers[id].amount;
            to.transfer(amount);
            return;
        }
        if (approvals[msg.sender][id] == false) {
            approvals[msg.sender][id] = true;
            transfers[id].numberOfApprovers++;
        }
        
    }

    modifier onlyApprover() {
        bool allowed = false;
        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
                
            }
        }
        require(allowed == true, "You are not allowed to do this transaction ");
        _;
    }
}
