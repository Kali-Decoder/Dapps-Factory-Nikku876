import React from "react";

const Navbar = () => {
  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link active">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">
            Disabled
          </a>
        </li>
      </ul>
      <div className="account">

      </div>
    </>
  );
};

export default Navbar;
