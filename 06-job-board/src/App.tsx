import React, { useCallback, useEffect, useState } from "react";
import type { IJob } from "./types";
import JobCard from "./components/JobCard";

const PAGE_SIZE = 6;

const App = () => {
  const [allJobIds, setAllJobIds] = useState<number[]>([]);
  const [jobIdOffset, setJobIdOffset] = useState<number>(0);
  const [visitedJobIdOffset, setVisitedJobIdOffset] = useState<number>(-1);

  const [loading, setLoading] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<IJob[]>([]);

  const onLoadMoreClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (jobIdOffset < allJobIds.length - 1 - PAGE_SIZE) {
      setJobIdOffset((currOffset) => currOffset + PAGE_SIZE);
    }
  }, [jobIdOffset, allJobIds]);

  useEffect(() => {
    const fetchAllJobIds = async () => {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
      setAllJobIds(await res.json());
    };

    fetchAllJobIds();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setVisitedJobIdOffset(jobIdOffset);

      for (let i = jobIdOffset; i < jobIdOffset + PAGE_SIZE && i < allJobIds.length; i++) {
        const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${allJobIds[i]}.json`);
        const jobData = (await res.json()) as IJob;
        setJobDetails((curr) => [...curr, jobData]);
      }

      setLoading(false);
    };

    if (!allJobIds.length || jobIdOffset <= visitedJobIdOffset) return;
    fetchJobDetails();
  }, [jobIdOffset, allJobIds]);

  return (
    <>
      <h2 className="app-title">Hacker News Job Board</h2>

      <div id="job-container">
        {jobDetails.map((job) => (
          <JobCard key={`job-card-${job.id}`} {...job} />
        ))}

        {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
        {jobIdOffset >= allJobIds.length - 1 - PAGE_SIZE ? (
          <p style={{ textAlign: "center" }}>No more jobs to load.</p>
        ) : (
          <button disabled={loading} onClick={onLoadMoreClick}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};

export default App;
