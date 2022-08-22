import React from "react";

const Loader = () => {
  return (
    <div className="row mt-3">
      <div className="col-md-6 col-6 col-xs-6 col-sm-6 mx-auto">
        <main>
          <h1>
            Loading<span class="dot">.</span>
            <span class="dot">.</span>
            <span class="dot">.</span>
            <sub>infinitely :)</sub>
          </h1>
          <div id="container">
            <div id="bar"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Loader;
