import React from "react";
import userData from "@constants/data";
import SurveyMap from "./SurveyMap";

const SOCIAL = [
  { key: "threads", label: "Threads" },
  { key: "facebook", label: "Facebook" },
  { key: "twitter", label: "Twitter (I refuse to called the new name)" },
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "peerlist", label: "Peerlist" },
];

const STACK = ["JavaScript", "TypeScript", "Node.js", "React", "Docker", "Firebase", "Laravel", "Express", "Git", "Linux", "MySQL", "Redis"];

export default function AboutMe() {
  return (
    <>
      <section className="page-head page-head--map">
        <SurveyMap seed={41} scrim="banner" plotsAt={0.7} />
        <div className="container">
          <h1>About me.</h1>
          <p className="statement page-head__line">
            {userData.about.title}. Currently working on <a href={userData.about.currentProjectUrl}>{userData.about.currentProject}</a>.
          </p>
        </div>
      </section>

      <section className="section" aria-label="The long version">
        <div className="container story">
          <div className="story__prose">
            {userData.about.description?.map((desc, idx) => (
              <p key={idx}>{desc}</p>
            ))}
          </div>
          <aside className="aside">
            <div>
              <h2>Contact</h2>
              <p>
                For any sort help / enquiry, shoot a{" "}
                <a href={`mailto:${userData.email}`} className="text-link">
                  mail
                </a>{" "}
                and I&rsquo;ll get back. I swear.
              </p>
            </div>
            <div>
              <h2>Job opportunities</h2>
              <p>
                I&rsquo;m looking for a job currently, If you see me as a good fit, check my{" "}
                <a href={userData.resumeUrl} target="__blank" className="text-link">
                  CV
                </a>{" "}
                and I&rsquo;d love to work for you.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section--tight section--flush-top" aria-label="Links and tools">
        <div className="container rows">
          <div className="row">
            <h2>Social links</h2>
            <ul className="links-grid">
              {SOCIAL.map((s) => (
                <li key={s.key}>
                  <a href={userData.socialLinks[s.key]}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="row">
            <h2>Tech stack</h2>
            <ul className="stack">
              {STACK.map((name) => (
                <li key={name} className="chip">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
