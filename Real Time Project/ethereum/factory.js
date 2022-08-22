import web3 from './web3';
import compiledFactory from './build/CampaignFactory.json';

const instance= new web3.eth.Contract(JSON.parse(compiledFactory.interface),'0x54F292Aa1578f2C725Aa523DE5AB54f707Cf9eAC');


export default instance;