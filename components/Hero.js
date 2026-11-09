import React from "react";
import Link from "next/link";
import userData from "@constants/data";
import SurveyMap from "./SurveyMap";

export default function Hero() {
  return (
    <section className="hero">
      <SurveyMap className="hero__map" seed={11} scrim="left" around=".hero__figure" label="Alor Setar, Kedah" />
      <div className="container hero__grid">
        <div className="hero__text">
          <h1 className="hero__head">
            <span>Developer.</span>
            <span>Engineer.</span>
            <span>Problem solver.</span>
            <span>Father.</span>
          </h1>
          <p className="lead hero__lead">Full-stack developer in Alor Setar, Kedah, now building Checkpoint Spot.</p>
          <div className="hero__actions">
            <Link href="/contact" className="btn btn--primary">
              Get in touch
            </Link>
          </div>
        </div>
        <figure className="hero__figure">
          <div className="photo hero__photo" data-slot="hero" data-alt="Azuan Alias outdoors, holding his daughter">
            <img
              src={userData.avatarUrl}
              width="3840"
              height="2160"
              alt="Azuan Alias holding his daughter on a misty, terraced hillside"
              fetchPriority="high"
              style={{ objectPosition: "30% 50%" }}
            />
          </div>
          <figcaption className="caption">That&rsquo;s me.</figcaption>
        </figure>
      </div>
    </section>
  );
}
