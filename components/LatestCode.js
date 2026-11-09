import React from "react";
import userData from "@constants/data";

function formatUpdatedDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export default function LatestCode({ repositories = [] }) {
  return (
    <section className="section band" aria-labelledby="latest-code">
      <div className="container code-layout">
        <header className="head-row">
          <h2 id="latest-code">Latest code</h2>
          <a href={`https://github.com/${userData.githubUsername}`} target="_blank" rel="noreferrer" className="btn head-row__action">
            View GitHub
          </a>
        </header>

        {repositories.length > 0 ? (
          <div className="sheet">
            <div className="repo-head" aria-hidden="true">
              <span>Repository</span>
              <span className="repo__lang">Language</span>
              <span>Updated</span>
            </div>
            <ul className="ruled">
              {repositories.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open ${repo.name} on GitHub`} className="repo">
                    <span className="repo__name">{repo.name}</span>
                    <span className="repo__lang">{repo.language || "Code"}</span>
                    <span className="repo__figure">{formatUpdatedDate(repo.updated_at)}</span>
                    {repo.description && <span className="repo__desc">{repo.description}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty">
            <h3>Recent GitHub activity will appear here</h3>
            <p>The section now supports live repository cards, but GitHub did not return data for this build.</p>
          </div>
        )}
      </div>
    </section>
  );
}
