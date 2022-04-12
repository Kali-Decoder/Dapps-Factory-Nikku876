import React from 'react'

const List = ({value}) => {
  return (
    <>
        <div className="card  p-2 mt-3"  style={{width:'100% !important'}}>
            <p className="text-success text-capitalize " style={{fontSize:'15px'}}>{value.content}</p>
            <code className="text-muted" >By -{value.author}</code>
            <code className="text-danger">{value.time}</code>

        </div>
    </>
  )
}

export default List