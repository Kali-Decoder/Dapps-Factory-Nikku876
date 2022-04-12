import React from "react";

const EventCard = () => {
  return (
    <>
        <div className="card p-2">
            <div className="d-flex">
                <div className="uri">
                    <img src="https://wallpaperaccess.com/full/2009555.jpg" className="card-img" alt="" />
                </div>
                <div className="data">
                    <h4 style={{fontWeight:'600'}}>Shinova Hinata</h4>
                    <span className="text-muted admin"><i class="fa-solid fa-phone mx-2 text-dark"></i>9079257904</span>
                    <span className="text-muted admin"><i class="fa-brands fa-ethereum mx-2 text-dark"></i>0xA3F30533C2A6E</span>
                    <div className="price">
                        <span className="text-dark">5</span>
                        <i class="fa-brands fa-ethereum mx-3 fa-2x text-danger  "></i>
                    </div>
                    <div className="tickets d-flex justify-content-between">
                        <div className="ticket">
                            <span className="text-info">5</span>
                            <code className="text-center">Total Tickets</code>
                        </div>

                        <div className="ticket">
                            <span className="text-danger">5</span>
                            <code className="text-center">Available Tickets</code>
                        </div>

                        <div className="ticket">
                            <span className="text-success">5</span>
                            <code className="text-center">Sold Tickets</code>
                        </div>
                    </div>
                    <form action="">
                    <input type="text" placeholder="Ticket" className="form-sm-control mt-3" />
                    <button className="btn-sm btn-primary mt-1">Buy Tickets</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default EventCard;
// uint256 id;
// address admin;
// string name;
// string uri;
// uint256 phone;
// uint256 price;
// uint256 availaibleTickets;
// uint256 totalTickets;
// uint256 soldTickets;
// uint256 date;