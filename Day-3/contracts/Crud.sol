// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.9.0;

contract Crud{

    uint public nextId=1;
    struct User{
        uint id;
         string name ;
    }

    User[] public users;
    function create(string memory _name) public  {
        users.push(User(nextId,_name));
        nextId++;
    }
    function read(uint _id) view public returns(uint,string memory){
        uint x= find(_id);
        return (users[x].id,users[x].name);

    }

    function update(uint _id,string memory _name) public {
        uint x= find(_id);
        users[x].name=_name;

    }

    function deleteUser(uint _id) public {
        uint x= find(_id);
        delete users[x];
    }

    function find(uint _id) view internal returns(uint) {

            for(uint i=0;i<users.length;i++){
                if(users[i].id==_id){
                   return (i);
                }
            }
            revert("User Does Not Exist !!!");
    }
}