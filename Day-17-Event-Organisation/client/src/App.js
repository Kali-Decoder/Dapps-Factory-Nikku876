import React from "react";
import EventCard from "./Components/EventCard";
import Navbar from './Components/Navbar';
const App = () => {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row mt-2">
          <div className="col-md-4 col-md-11 col-xs-4 col-lg-4 mx-auto">
            <EventCard />
          </div>

          <div className="col-md-4 col-md-11 col-xs-4 col-lg-4 mx-auto">
            <EventCard />
          </div>

          <div className="col-md-4 col-md-11 col-xs-4 col-lg-4 mx-auto">
            <EventCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
