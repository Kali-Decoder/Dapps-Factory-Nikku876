require("@nomiclabs/hardhat-waffle");


module.exports={
  solidity:"0.8.4",
  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/iSoLFoQDND_y0a4IOLotRoJ-ZPy2r5it',
      //jis account se contract deployed hoga uski private key
      accounts:['46a7ff1b52f33b381d8e4f952703ba7a60bae6223c9c867dba5bcd2eb7a468ad'],
    }
  }
}

