import QRCode from "qrcode";

const main= async (x)=>{
    try {
        let y= await QRCode.toString(x,{type:'terminal'});
        return y;
    } catch (error) {
        console.log(error);
    }
    
}
export default main;
