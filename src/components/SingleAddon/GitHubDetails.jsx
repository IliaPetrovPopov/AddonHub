import { useEffect, useState } from "react";
import {
  fetchLastCommit,
  fetchPullRequests,
  fetchRepo,
} from "../../services/github.service";

import "katex/dist/katex.min.css";
import { getTimeDifference } from "../../common/helperFunctions/timeDifference";
import PropTypes from "prop-types";

const GitHubDetails = ({ pathUrl, onSizeChange }) => {
  const path = pathUrl.replace("https://github.com/", "");
  const [fullInfo, setFullInfo] = useState(null);
  const [pullRequests, setPullRequests] = useState(0);
  const [lastCommit, setLastCommit] = useState(new Date());
  const [lastCommitMessage, setLastCommitMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRepo(path);
      const pullReq = await fetchPullRequests(path);
      const { lastDate, message } = await fetchLastCommit(path);
      setFullInfo(data);
      setPullRequests(pullReq);
      setLastCommit(lastDate);
      setLastCommitMessage(message);
      onSizeChange(data.size);
    };
    fetchData();
  }, [path]);

  if (!fullInfo) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  return (
    <div className="md:col-span-3 grid row-span-3 md:grid-cols-3 text-sm md:text-md gap-3">
      <div className="col-span-1 ">
        <h5 className="mb-2 font-semibold">Project details</h5>
        <a href={pathUrl} className="bi bi-github ">
          {" "}
          GitHub repo link
        </a>{" "}
        <div>
          <i className="bi bi-patch-check" />{" "}
          {fullInfo.license?.name || "No license"}
        </div>{" "}
        {pullRequests > 0 && (
          <div>
            <i className="fa-solid fa-code-pull-request"></i> {pullRequests}{" "}
            pull requests
          </div>
        )}
      </div>
      <div className="col-span-1">
        <h5 className="mb-2 font-semibold">More info</h5>
        <a href={fullInfo.owner?.html_url}>
          <i className="fa-solid fa-user-pen"></i>{" "}
          {fullInfo.owner?.login || "Unknown"}
        </a>
        {fullInfo.created_at && (
          <div>
            <i className="fa-solid fa-calendar-plus mr-1"></i> Created on{" "}
            {new Date(fullInfo.created_at).toLocaleDateString()}
          </div>
        )}
        {lastCommitMessage && (
          <div
            className="tooltip tooltip-bottom"
            data-tip={`Commit message: ${lastCommitMessage.split("\n")[0]}`}
          >
            <i className="fa-solid fa-code-commit "></i> Last commit{" "}
            <span className="font-semibold">
              {getTimeDifference(lastCommit)}
            </span>
          </div>
        )}
      </div>
      <div className="col-span-1d">
        {fullInfo && (
          <>
            {" "}
            <h5 className="mb-2 font-semibold">Popularity</h5>{" "}
            {fullInfo.stargazers_count && (
              <div>
                <i className="fa-regular fa-star"></i>{" "}
                {fullInfo.stargazers_count} stars
              </div>
            )}{" "}
            {fullInfo.subscribers_count && (
              <div>
                <i className="fa-regular fa-eye"></i>{" "}
                {fullInfo.subscribers_count} watchers
              </div>
            )}{" "}
            {fullInfo.forks_count && (
              <div>
                <i className="fa-solid fa-code-fork"></i> {fullInfo.forks_count}{" "}
                forks
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

GitHubDetails.propTypes = {
  pathUrl: PropTypes.string,
  onSizeChange: PropTypes.func,
};

GitHubDetails.defaultProps = {
  onSizeChange: () => {},
};

export default GitHubDetails;
