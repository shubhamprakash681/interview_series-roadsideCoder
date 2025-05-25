import React from "react";

type LoaderProps = {
  loaderPercentage: number;
};

const Loader: React.FC<LoaderProps> = ({ loaderPercentage }) => {
  return (
    <div className="progress-wrapper">
      <h2>Progress Bar</h2>

      <div className="progress-container">
        <div className="progress-bar"></div>
        <div style={{ width: `${loaderPercentage}%` }} className="progress-bar-progress"></div>
        <div className="progress-bar-text">{loaderPercentage} %</div>
      </div>

      <div>{loaderPercentage >= 100 ? "Completed" : "Loading..."}</div>
    </div>
  );
};

export default Loader;
