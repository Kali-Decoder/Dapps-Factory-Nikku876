// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
// Import some items from openzeppline library for working of our contract
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { Base64 } from "./Base64.sol";

contract MyNft is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string baseSvg =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    constructor() ERC721("CircleNFT", "CNFT") {}

    string[] haikyuu = [
        "Shoyo Hinata",
        "Tobio Kageyama",
        "Kei Tsukishima",
        "Tadashi Yamaguchi",
        "Daichi Sawamura",
        "Koshi Sugawara",
        "Suga",
        "Asahi Azumane",
        "Yu Nishinoya",
        "Ryunosuke Tanaka",
        "Chikara Ennoshita",
        "Hisashi Kinoshita",
        "Kazuhito Narita",
        "Kiyoko Shimizu"
        "Hitoka Yachi",
        "Ittetsu Takeda"
    ];
    string[] dragonBallZ = [
        "Son Goku",
        "Bulma",
        "Krillin",
        "Piccolo",
        "Son Gohan",
        "Vegeta",
        "Bardock"
    ];

    function pickRandomFirst(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = _random(
            string(abi.encodePacked("First_word", Strings.toString(tokenId)))
        );
        rand = rand % haikyuu.length;
        return (haikyuu[rand]);
    }

    function pickRandomSecond(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = _random(
            string(abi.encodePacked("Second_word", Strings.toString(tokenId)))
        );
        rand = rand % dragonBallZ.length;
        return (dragonBallZ[rand]);
    }

    function _random(string memory input) private pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function makeAnEpicNft() public {
        uint256 currentId = _tokenIds.current();

        string memory first = pickRandomFirst(currentId);
        string memory second = pickRandomSecond(currentId);
        string memory combine = string(abi.encodePacked(first, second));
        //inbuilt function for minting nft

        string memory finalPath = string(
            abi.encodePacked(baseSvg, combine, "</text></svg>")
        );

        // get all json data to base 64
        string memory _json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        // We set the title of our NFT as the generated word.
                        combine,
                        '", "description": "A highly acclaimed collection of Circle Nfts .", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalPath)),
                        '"}'
                    )
                )
            )
        );
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", _json)
        );
        _safeMint(msg.sender, currentId);

        //Set token uri
        _setTokenURI(currentId, finalTokenUri); //json is meta data

        //increase your token id

        _tokenIds.increment();
    }
}
