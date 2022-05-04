import React from "react";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <i class="fa-solid fa-cube"></i> --{" "}
        <span className="text-danger">DCS</span> --
        <i class="fa-solid fa-cube"></i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item text-center  ">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item text-center ">
            <a className="nav-link" href="#">
              Upload Course
            </a>
          </li>

          <li className="nav-item text-center">
            <a className="nav-link" href="#">
              Search Course
            </a>
          </li>

          <li className="nav-item text-center ">
            <a className="nav-link" href="#">
              My Courses
            </a>
          </li>

          <li className="nav-item text-center ">
            <a className="nav-link" href="#">
              My Balance
            </a>
          </li>
        </ul>
        <button
          className="btn connection"
          style={{ border: "3px solid white" }}
        >
          Connection is valid
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
