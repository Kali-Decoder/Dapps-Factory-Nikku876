const {File, NFTStorage}= require("nft.storage");
const dotenv= require('dotenv').config({path:'./.env'});
const client= new NFTStorage({token:process.env.API_KEY});

async function main(meta){
    const metaData= await client.store({...meta,image: new File(
        [
          /* data */
        ],
        '',
        { type: 'image/jpg' }
      ),});
    console.log(metaData);
    return metaData;
}

module.exports= main;
