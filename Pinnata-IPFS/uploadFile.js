const pinataApiKey = "3c23c85e489a729f362c";
const pinataSecretApiKey = "acbfcf99d59d578d1593b04c5bee3fec3f280e791f362ce0ade1c5d63d67265d";
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
let data = new FormData();
const pinFileToIPFS=async ()=>{
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const x= `{
      "name":"My Kid's Art",
      "hash": "QmfAvnM89JrqvdhLymbU5sXoAukEJygSLk9cJMBPTyrmxo", 
      "by": "Justin Huner"
    }`;
    // data.append("file", fs.createReadStream("./wp3754595.jpg"));
    data .append("file",x);
    const res = await axios.post(url, data, {
        maxContentLength: "Infinity", 
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey, 
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
      console.log(res.data);
      //https://gateway.pinata.cloud/ipfs/QmfAvnM89JrqvdhLymbU5sXoAukEJygSLk9cJMBPTyrmxo/
}

pinFileToIPFS();