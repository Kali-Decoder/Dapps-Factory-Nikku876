import urlExist from "url-exist";

const main=async(x)=>{
    try {
        let y = await urlExist(x);
        return y;
        
    } catch (error) {
        console.log(error);
    }
}


export default main;