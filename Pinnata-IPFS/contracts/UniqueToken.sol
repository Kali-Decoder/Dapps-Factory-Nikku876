// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UniqueToken is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(string => uint8) hashes;

    constructor() public ERC721("UniqueAsset", "UNA") {}

    function awardItem(
        address recipient,
        string memory hash,
        string memory metadata
    ) public returns (uint256) {
        require(hashes[hash] != 1);
        hashes[hash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadata);
        return newItemId;
    }
}
