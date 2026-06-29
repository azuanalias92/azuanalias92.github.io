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
    <section className="bg-[#F1F1F1] -mt-40 dark:bg-gray-900 pb-40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:pt-40 mx-10">
          <h1 className="text-6xl lg:text-9xl max-w-lg font-bold  my-20 md:my-0 text-center lg:text-left">Latest Code</h1>
          <a
            href={`https://github.com/${userData.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="mb-20 md:mb-0 px-8 py-4 rounded-md bg-white shadow-lg text-xl font-semibold flex flex-row space-x-4 items-center dark:text-gray-700 hover-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-right-square"
              stroke="4"
              strokeWidth="4"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
              />
            </svg>
            <p>View GitHub</p>
          </a>
        </div>

        {repositories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 animate-fadeIn">
            {repositories.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${repo.name} on GitHub`}
                className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-gray-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                      GitHub Repo
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {repo.name}
                    </h2>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                    {repo.language || "Code"}
                  </span>
                </div>

                <p className="mt-4 flex-1 text-base leading-7 text-gray-600 dark:text-gray-300">
                  {repo.description || "Recent work from GitHub without a published description yet."}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Updated {formatUpdatedDate(repo.updated_at)}</span>
                  <span>{repo.stargazers_count} stars</span>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-blue-400">
                  View repository
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="mx-4 rounded-3xl bg-white p-10 text-center shadow-lg dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent GitHub activity will appear here</h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
              The section now supports live repository cards, but GitHub did not return data for this build.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
