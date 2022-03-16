// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract String {
    function toGetLength(string memory str) public pure returns (uint256) {
        bytes memory strCopy = bytes(str);
        return strCopy.length;
    }

    function concatenationString(string memory str1, string memory str2)
        public
        pure
        returns (string memory, uint256)
    {
        bytes memory str1Copy = bytes(str1);
        bytes memory str2Copy = bytes(str2);
        bytes memory str3 = new bytes(str1Copy.length + str2Copy.length);
        uint256 k = 0;
        for (uint256 x = 0; x < str1Copy.length; x++) {
            str3[k] = str1Copy[x];
            k++;
        }
        for (uint256 i = 0; i < str2Copy.length; i++) {
            str3[k] = str2Copy[i];
            k++;
        }
        uint256 len = str3.length;
        string memory combine = string(str3);

        return (combine, len);
    }

    function reverseString(string memory _base)
        public
        pure
        returns (string memory)
    {
        bytes memory _baseBytes = bytes(_base);
        assert(_baseBytes.length > 0);

        string memory _tempValue = new string(_baseBytes.length);
        bytes memory _newValue = bytes(_tempValue);


        for(uint i=0;i<_baseBytes.length;i++){
            _newValue[ _baseBytes.length - i - 1] = _baseBytes[i];
        }

        return string(_newValue);
    }
}
