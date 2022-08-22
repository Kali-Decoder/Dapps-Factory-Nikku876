import React from 'react'

const Message = ({balance}) => {
  return (
    <h4> Your Balance : <code className="text-white"><strong>{balance}</strong></code></h4>
  );
}

export default Message