// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    function Inbox(string _latestMessage) public {
        message=_latestMessage;
    }
    function setMessage(string changeMessage) public {
        message= changeMessage;
    }
}