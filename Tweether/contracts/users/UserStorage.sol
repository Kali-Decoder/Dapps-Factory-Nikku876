// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import '../helpers/BaseStorage.sol';
contract UserStorage is BaseStorage{
    struct User{
        uint id;
        bytes32 username;
        bytes32 firstName;
        bytes32 lastName;
        string bio;
        string gravatarEmail;
    }
    uint public nextUserId;
    mapping(uint=>User) public users;
    mapping(address=>uint) public addresss;
    mapping(bytes32=>uint) public usernames;

    function createUser(bytes32 _username, bytes32 _firstname,bytes32 _lastname,string memory _bio,string memory _gravatarEmail) public onlyController returns(uint) {
        nextUserId++;
        users[nextUserId]=User(nextUserId,_username,_firstname,_lastname,_bio,_gravatarEmail);
        addresss[msg.sender]=nextUserId;
        usernames[_username]=nextUserId;
        
        return nextUserId;
    }
}