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

const pad = (number) => (number.length === 1 ? `0${number}` : number);

export default function Projects() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1>Projects</h1>
        </div>
      </section>
      <section className="section--tight section--flush-top" aria-label="All projects">
        <div className="container">
          <ol className="index">
            {userData.projects.map((proj, idx) => (
              <li key={proj.title}>
                <ProjectRow
                  title={proj.title}
                  description={proj.description}
                  link={proj.link}
                  imgUrl={proj.imgUrl}
                  number={`${idx + 1}`}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

const ProjectRow = ({ title, description, link, imgUrl, number }) => {
  const { host, cta } = getProjectMeta(link);

  return (
    <a href={link} target="_blank" rel="noreferrer" aria-label={`${cta}: ${title}`} className="index-row">
      <span className="index-row__num">{pad(number)}</span>
      <div>
        <h2 className="index-row__title">{title}</h2>
        <p className="index-row__desc">{description || "Project details coming soon."}</p>
      </div>
      <p className="index-row__host">
        {host}
        <span className="index-row__cta">{cta}</span>
      </p>
      <div className="screen index-row__screen" data-slot={`project-${number}`} data-kind="product" data-alt={`${title}, its main screen`}>
        <img src={imgUrl} alt={`${title} preview`} width="1280" height="960" loading="lazy" />
      </div>
    </a>
  );
};

export const ProjectCard = ({ title, description, link, imgUrl, number }) => {
  const { host, cta } = getProjectMeta(link);

  return (
    <a href={link} target="_blank" rel="noreferrer" aria-label={`${cta}: ${title}`} className="project">
      <div className="screen project__screen" data-slot={`work-${number}`} data-kind="product" data-alt={`${title}, its main screen`}>
        <img src={imgUrl} alt={`${title} preview`} width="1280" height="960" loading="lazy" />
      </div>
      <div className="project__meta">
        <span className="project__num">{pad(number)}</span>
        <h3 className="project__title">{title}</h3>
        <p className="project__desc">{description || "Project details coming soon."}</p>
        <p className="project__host">
          {host}, {cta.toLowerCase()}
        </p>
      </div>
    </a>
  );
};
