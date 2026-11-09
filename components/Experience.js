import userData from "@constants/data";
import React from "react";
import SurveyMap from "./SurveyMap";

const STUDY = ["Graduation", "High School"];

// Where each record sits along the route, oldest bottom left, newest top right (percent of the map).
const POINTS = [
  [90, 9],
  [83.5, 15.5],
  [77, 22],
  [70.5, 28.5],
  [64, 35],
  [57.5, 41.5],
  [51, 48],
  [44.5, 54.5],
];

export default function Experience() {
  const records = userData.experience;
  const pts = POINTS.slice(0, records.length);
  const route = pts
    .slice()
    .reverse()
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
    .join(" ");

  return (
    <>
      <section className="page-head page-head--map">
        <SurveyMap seed={23} scrim="left" plots={false}>
          <svg className="route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d={route} />
          </svg>
          <ol className="pins" aria-label="Career route, newest first">
            {records.map((exp, idx) => {
              const [x, y] = pts[idx] || [50, 50];
              const study = STUDY.includes(exp.title);
              return (
                <li key={idx} className={`pin${idx === 0 ? " pin--open" : ""}${x > 60 ? " pin--left" : ""}`} style={{ left: `${x}%`, top: `${y}%`, "--i": records.length - idx }}>
                  <span className={`pin__mark ${study ? "pin__mark--diamond" : "pin__mark--disc"}`} aria-hidden="true" />
                  <span className="pin__tag">
                    <span className={/^\d+$/.test(exp.year) ? "pin__year" : "pin__word"}>{exp.year}</span>
                    <span className="pin__tag--long"> {exp.title}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </SurveyMap>
        <div className="container">
          <h1>Experience</h1>
          <div className="map-key" aria-hidden="true">
            <span>
              <span className="pin__mark pin__mark--disc" /> Work
            </span>
            <span>
              <span className="pin__mark pin__mark--diamond" /> School
            </span>
          </div>
        </div>
      </section>

      <section className="section--tight" aria-label="The record">
        <div className="container">
          <ol className="ruled record">
            {records.map((exp, idx) => (
              <ExperienceCard key={idx} title={exp.title} desc={exp.desc} year={exp.year} company={exp.company} companyLink={exp.companyLink} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

const ExperienceCard = ({ title, desc, year, company, companyLink }) => {
  return (
    <li>
      <p className="record__year">{year === "Current" ? <span className="chip chip--live record__now">Current</span> : year}</p>
      <div>
        <h2 className="record__title">{title}</h2>
        <a href={companyLink} className="text-link record__company">
          {company}
        </a>
      </div>
      <p className="record__desc">{desc}</p>
    </li>
  );
};
