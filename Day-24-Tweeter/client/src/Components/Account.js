import React,{useState} from 'react'
import getWeb3 from './constant/web3';
const Account = ({account}) => {
    const [bal,setBal]=useState('');
    const getBal=async ()=>{
        try {
            let web3= await getWeb3();
            let b= await web3.eth.getBalance(account);
            b= await web3.utils.fromWei(b,'ether');
            setBal(b);
        } catch (error) {
            console.log(error);
        }
    }
    getBal();
  return (
    <> 
        <div className="account p-2 mt-2">
            <h6 className="text-primary">
                Account 1
            </h6>
            <code className="text-danger">{account}</code> <br />
            <code className="text-success">Balance:- {bal}</code>


        </div> 

    </>
  )
}

export default Account