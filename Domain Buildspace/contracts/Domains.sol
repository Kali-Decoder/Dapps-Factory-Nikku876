// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {StringUtils} from "./libraries/stringUtils.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Base64} from "./libraries/Base64.sol";

contract Domains is ERC721URIStorage {
    string public uri;
    //create NFT of domain
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string svgPartOne =
        '<svg viewBox="0 0 1320 300"><text x="50%" y="50%" dy=".25em" text-anchor="middle">';
    string svgPartTwo = "</text></svg>";

    address public admin;
    string public tld; //top level domain
    //to store domains associated with their addresses
    mapping(string => address) public domains;
    mapping(string => string) public records;

    constructor(string memory _tld)
        payable
        ERC721("Ninja Name Service", "NNS")
    {
        tld = _tld;
        admin = msg.sender;
    }

    function calcPrice(string memory _name) public pure returns (uint256) {
        uint256 len = StringUtils.strlen(_name);
        require(len > 2, "Please enter string greater than 2 length");
        if (len == 3) {
            return 5 * 10**17; // 5 MATIC = 5 000 000 000 000 000 000 (18 decimals). We're going with 0.5 Matic cause the faucets don't give a lot
        } else if (len == 4) {
            return 3 * 10**17; // Small domain have more charge
        } else if (len >= 5) {
            // fixed charge for length greater than 4
            return 1 * 10**17;
        }
    }

    // a register function to register string with address of node which call this function
    function register(string calldata _name, string calldata _desc)
        public
        payable
    {
        require(domains[_name] == address(0), "Already exist its owner");
        uint256 price = calcPrice(_name);
        require(
            msg.value >= price,
            "You have not enough payment to accquire this domain "
        );
        // Combine the name passed into the function  with the TLD
        string memory name = string(abi.encodePacked(_name, ".", tld));
        // Create the SVG (image) for the NFT with the name
        string memory finalSvg = string(
            abi.encodePacked(svgPartOne, name, svgPartTwo)
        );
        uint256 newRecordId = _tokenIds.current();
        uint256 length = StringUtils.strlen(_name);
        string memory strLen = Strings.toString(length);

        domains[_name] = msg.sender;

        // Create the JSON metadata of our NFT. We do this by combining strings and encoding as base64
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                name,
                '", "description": "',
                _desc,
                '","image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(finalSvg)),
                '","length":"',
                strLen,
                '"}'
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        // _safeMint(msg.sender, newRecordId);
        _mint(msg.sender, newRecordId);
        _setTokenURI(newRecordId, finalTokenUri);
        domains[_name] = msg.sender;
        uri = finalTokenUri;
        _tokenIds.increment();
    }

    // // This will give us the domain owners' address

    function getDomainAddress(string calldata _name)
        public
        view
        returns (address)
    {
        return domains[_name];
    }

    // function to set record
    function setRecord(string calldata _name, string calldata _record) public {
        require(domains[_name] == msg.sender, "this domain is not yours ");
        records[_name] = _record;
    }

    // get record of your domain
    function getRecord(string calldata _name)
        public
        view
        returns (string memory)
    {
        return records[_name];
    }
}
