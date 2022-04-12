// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Ebay{
    address public ManagerDirector;
    string public name;
    uint public baseFeeOfProduct=100 wei;
    struct Product{
        uint id;
        address payable seller;
        string uri;
        string desc;
        string name;
        uint minPrice;
        uint endDate;
        uint bestOfferId;
        uint[] offerIds;
    }
    struct Offer{
        uint id;
        uint productId;
        address payable buyer;
        uint priceBidding;

    }
    mapping(uint=>Offer) private offers;
    mapping(uint=>Product) private products;
    uint private nextProductId=1;
    uint private nextOfferId=1;
    
    constructor(string memory _name){
        ManagerDirector=msg.sender;
        name=_name;

    }

    function createAuction(string calldata _name,string calldata _desc,uint _minPrice,uint _duration,string calldata _uri) external payable {
        require(msg.value==baseFeeOfProduct,"Please Provide Base Fee To Sell Your Product");
        payable(ManagerDirector).transfer(msg.value);
        require(_minPrice>0 ,"Minimum prices should be greater than zero");
        require(_duration>=86400 && _duration<=864000,"End date should be greater than one day and 10 days");
        uint[] memory offerIds= new uint[](0);
            products[nextProductId]=Product(nextProductId,payable(msg.sender),_uri,_desc,_name,_minPrice,block.timestamp + _duration,0,offerIds);
            nextProductId++;
    }



    function createOffer(uint _offerId) external payable productExist(_offerId) {
        Product storage product = products[_offerId];
        Offer storage bestOffer= offers[product.bestOfferId];
        require(block.timestamp<product.endDate,"Auction ended");
        require(msg.value >= product.minPrice && msg.value> bestOffer.priceBidding,"You are unable to bidding");

        product.bestOfferId= nextOfferId;
        product.offerIds.push(nextOfferId);
        offers[nextOfferId]= Offer(nextOfferId,_offerId,payable(msg.sender),msg.value);
        
    }


    function trade(uint _productId) external payable productExist(_productId){
        Product storage product = products[_productId];
        Offer storage bestOffer= offers[product.bestOfferId];
        require(block.timestamp > product.endDate,"Auction is not ended");

        for(uint i=0;i<product.offerIds.length;i++){
            uint offerId= product.offerIds[i];
            if(offerId!=product.bestOfferId){
                offers[offerId].buyer.transfer(offers[offerId].priceBidding);
            }
            product.seller.transfer(bestOffer.priceBidding);
        }
        
    }

    modifier productExist(uint id){
        require(id>0 && id<nextProductId,"Product Does Not Exist");
        _;
    }

}