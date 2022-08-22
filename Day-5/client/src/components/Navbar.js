import React from 'react'

const Navbar = () => {
  return (
    <div className="container">
        <div className="row mt-3">
            <div className="col-md-12 col-12 col-xs-12 col-sm-12 col-lg-12 mx-auto d-flex justify-content-around">
                <div className="navbar-icon">
                    <h5><strong>Dr. <i className="fa-solid fa-stethoscope mx-2"></i> <span className="text-danger">NFT</span></strong> </h5>
                </div>
                <div className="navbar-items">
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href=""><i className="fa-brands fa-ethereum mx-2"></i>Sell NFT</a>
                    <a href=""><i className="fa-brands fa-ethereum mx-2"></i>Buy NFT</a>
                    <button className='button'>Log in</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar