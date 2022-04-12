// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MarketPlace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemSold;

    uint256 public listingPrice = 0.025 ether;

    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    struct MarketItem {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool sold;
    }
    event MarketItemCreated(
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool sold
    );

    constructor() ERC721("Metaverse Nickk", "MTC") {
        owner = payable(msg.sender);
    }

    function updatingListingPrice(uint256 _updateValue) public {
        require(
            msg.sender == owner,
            "Only owner of contract can update listingPrice"
        );
        listingPrice = _updateValue;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenUri, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenUri);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "price must be equal to listingPrice"
        );
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(address(0)),
            payable(msg.sender),
            price,
            false
        );
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(tokenId, address(0), msg.sender, price, false);
    }

    function createdMarketSale(uint tokenId) public payable{
        uint price= idToMarketItem[tokenId].price;
        address seller= idToMarketItem[tokenId].seller;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        idToMarketItem[tokenId].owner=payable(msg.sender);
        idToMarketItem[tokenId].sold=true;
        idToMarketItem[tokenId].seller=payable(address(0));
        _itemSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    // return all unsold market items 
    function fetchMarketItems() public view returns(MarketItem[] memory){
        uint itemCount=_tokenIds.current();
        uint unSoldCount= itemCount-_itemSold.current();
        uint currentIdx=0;
        MarketItem[] memory unsoldItems= new MarketItem[](unSoldCount);
        for(uint i=1;i<=unSoldCount;i++){
            if(idToMarketItem[i].owner==address(this)){
                MarketItem storage newItem= idToMarketItem[i];
                unsoldItems[currentIdx]=newItem;
                currentIdx++;
            }
        }

        return unsoldItems;

    }

    /* Returns only items that a user has purchased */

    function itemsYouPurchased() public view returns(MarketItem[] memory){
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for(uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].owner==msg.sender){
                itemCount++;
            }
        }
        MarketItem[] memory purchasedItems= new MarketItem[](itemCount);
        for(uint i=1;i<=totalItemCount;i++){
            if(idToMarketItem[i].owner==msg.sender){
                MarketItem storage newItem= idToMarketItem[i];
                purchasedItems[currentIndex]=newItem;
                currentIndex++;
            }
        }

        return purchasedItems;
    }


     /* Returns only items a user has listed */

     function fetchMyItemsListed() public view returns(MarketItem[] memory){
         uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for(uint i=0;i<totalItemCount;i++){
            if(idToMarketItem[i+1].seller==msg.sender){
                itemCount++;
            }
        }
        MarketItem[] memory sellItems= new MarketItem[](itemCount);
        for(uint i=1;i<=totalItemCount;i++){
            if(idToMarketItem[i].seller==msg.sender){
                MarketItem storage newItem= idToMarketItem[i];
                sellItems[currentIndex]=newItem;
                currentIndex++;
            }
        }

        return sellItems;
     }

}
