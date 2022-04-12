// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.26;


contract MarketPlace{
    uint public idx;
    address public manager;
    constructor(){
        manager=msg.sender;
    }
    
    modifier onlyOwner(){
        require(msg.sender==manager,"You Are Not Manager");
        _;
    }
    struct Product{
        address  owner;
        string name;
        string image;
        string description;
        string location;
        uint price;
        uint sold;
        
    }
    mapping(uint=>Product) internal products;

    function writeProduct(string memory name,string memory image,
    string memory description,string memory location,uint price ) public onlyOwner {
       Product memory newProduct= Product({
           owner:(msg.sender),
           name:name,
           image:image,
           description:description,
           location:location,
           price:price,
           sold:0
       });

       products[idx]=newProduct;
       idx++;
    }

    function getProduct(uint i) public view returns(address ,string memory ,string memory ,
    string memory ,string memory ,uint,uint){
        return (
            products[i].owner,
            products[i].name,products[i].image,products[i].description,products[i].location,products[i].price,products[i].sold
        );
    }

    function getTotalNumberProducts() public view returns(uint){
        return idx;
    }

    function buyProduct(uint _index) public  {
        bool sent = products[_index].owner.send(msg.value);
        products[_index].sold+=1;
        
    }
}