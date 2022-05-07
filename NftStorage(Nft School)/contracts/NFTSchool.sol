// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTBuilder is ERC721 {


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public admin;

    constructor(string memory _tokenName, string memory _symbol)
        ERC721(_tokenName, _symbol)
    {
        admin = msg.sender;
        // _setBaseURI("ipfs://");
    }

    function mintToken(string memory _metadataURI) public returns (uint256) {
        uint256 id = _tokenIds.current();
        _mint(msg.sender, id);

        // _setTokenURI(id, _metadataURI);
        _tokenIds.increment();

        return id;
    }
}
