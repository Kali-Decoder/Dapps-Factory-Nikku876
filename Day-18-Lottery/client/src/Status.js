import React from 'react'

const Status = ({value}) => {
  return (
    <div className="container">
        <div className="row mt-4 mb-4">
                <div className="col-md-12 col-12 col-xs-12 col-sm-12 mx-auto p-3">
                    <h4 className="text-success text-center">
                        {value ? value: 'This Address'} Is Winner !!! Congratulations Bruh🤸
                    </h4>
                </div>
        </div>
    </div>
  )
}

export default Status