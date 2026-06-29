import React from "react";
import userData from "@constants/data";

function getProjectMeta(link) {
  try {
    const hostname = new URL(link).hostname.replace("www.", "");
    return {
      host: hostname,
      cta: hostname.includes("github.com") ? "View source" : "Visit project",
    };
  } catch (error) {
    return {
      host: "External link",
      cta: "Open project",
    };
  }
}

export default function Projects() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left animate-slideInFromLeft">Projects</h1>
      </div>
      {/* Grid starts here */}
      <div className="bg-[#F1F1F1] -mt-10 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 pb-40 animate-fadeIn">
          {userData.projects.map((proj, idx) => (
            <ProjectCard
              key={proj.title}
              title={proj.title}
              description={proj.description}
              link={proj.link}
              imgUrl={proj.imgUrl}
              number={`${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const ProjectCard = ({ title, description, link, imgUrl, number }) => {
  const { host, cta } = getProjectMeta(link);

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={`${cta}: ${title}`}
      className="group block h-full"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)] dark:bg-gray-800 animate-fadeIn">
        <div className="relative h-72 overflow-hidden">
          <img
            src={imgUrl}
            alt={`${title} preview`}
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute top-6 left-6 rounded-full bg-white/20 px-4 py-1 text-sm font-semibold tracking-[0.2em] text-white backdrop-blur">
            {number.length === 1 ? `0${number}` : number}
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              {host}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6">
          <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
            {description || "Project details coming soon."}
          </p>

          <div className="mt-auto inline-flex items-center justify-between text-sm font-semibold text-blue-600 dark:text-blue-400">
            <span>{cta}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </div>
    </a>
  );
};
