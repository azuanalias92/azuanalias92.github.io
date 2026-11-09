import React from "react";
import Link from "next/link";
import userData from "@constants/data";
import { ProjectCard } from "./Projects";

export default function FavouriteProjects() {
  return (
    <section className="section section--rule" aria-labelledby="favourite-projects">
      <div className="container">
        <header className="head-row">
          <h2 id="favourite-projects">Favourite projects</h2>
          <Link href="/projects" className="btn">
            View all
          </Link>
        </header>

        <div className="work-grid">
          {userData.projects.slice(0, 3).map((proj, idx) => (
            <ProjectCard
              key={proj.title} // Always add a key in lists
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
