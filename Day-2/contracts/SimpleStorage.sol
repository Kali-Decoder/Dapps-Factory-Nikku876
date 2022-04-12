// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract SimpleStorage{

     uint[] public ids;
    function add(uint id) public {
        ids.push(id);
    }

    function getData(uint _id) public view returns(uint){
        return ids[_id];
    } 

    function getAll() public view returns(uint[] memory){
        return ids;
    }

    function getLength() view public returns(uint){
        return ids.length;
    }
}