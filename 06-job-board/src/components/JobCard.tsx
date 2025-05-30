import React from "react";
import type { IJob } from "../types";

const JobCard: React.FC<IJob> = ({ by, time, title, url }) => {
  const timeString = new Date(time).toLocaleString();

  return (
    <div className="job-card">
      {url ? (
        <a href={url} target="_blank">
          <h3 style={{ fontWeight: "bolder" }}>{title}</h3>
        </a>
      ) : (
        <h3 style={{ fontWeight: "bolder" }}>{title}</h3>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span>By {by}</span>
        <span>•</span>
        <span>{timeString}</span>
      </div>
    </div>
  );
};

export default JobCard;
