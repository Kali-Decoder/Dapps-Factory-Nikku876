import React, { useContext } from 'react'
import Loading from './Loading';
import  TransactionContext  from "./ContextTransaction";
const Transaction = () => {
  const {currentAccount,isLoading,formData,handleChange,sendTransaction}= useContext(TransactionContext);
  const handleClick=(e)=>{
    
    const {addressTo,amount,message,keyword}= formData;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;
    
    sendTransaction();
  }
  return (
    <>
        <div className="container mt-4" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <div className="data d-flex">
              {currentAccount ? <h6>Current Wallet Address : <code className="text-danger">{currentAccount}</code> </h6>:<h6>No Connection</h6>}
            </div>
            <div className="data-input p-3" >
                <form action="">
                  <input type="text" placeholder='Address To' name="addressTo" onChange={(e)=>handleChange(e,e.target.name)} />
                  <input type="number" step={0.1} placeholder='Amount (in Eth)' name="amount" onChange={(e)=>handleChange(e,e.target.name)} />
                  <input type="text" placeholder='Keyword (GIF)' name="keyword" onChange={(e)=>handleChange(e,e.target.name)} />
                  <input type="text" placeholder='Message' name='message' onChange={(e)=>handleChange(e,e.target.name)} />
                  <hr />
                  {isLoading ? <Loading className="mt-2 mb-2"/> : <button className="button" onClick={handleClick}>Send Now</button>}
                </form>
            </div>
        </div>
    </>
  )
}

export default Transaction