import React from "react";

const Loader = () => {
  return (
    <>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-border text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Loader;
