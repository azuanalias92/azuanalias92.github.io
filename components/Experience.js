import userData from "@constants/data";
import React from "react";

export default function Experience() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left animate-slideInFromLeft">Experience</h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-10">
        <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-36 animate-fadeIn">
          {/* Experience card */}
          {userData.experience.map((exp, idx) => (
            <>
              <ExperienceCard
                key={idx}
                title={exp.title}
                desc={exp.desc}
                year={exp.year}
                company={exp.company}
                companyLink={exp.companyLink}
                className={`animate-fadeIn delay-${idx * 100}`}
              />
              {idx === userData.experience.length - 1 ? null : (
                <div className="divider-container flex flex-col items-center -mt-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                  </div>
                  <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

const ExperienceCard = ({ title, desc, year, company, companyLink, className }) => {
  return (
    <div className={`relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4 hover-lift animate-fadeIn ${className || ''}`}>
      <h1 className="absolute -top-10 md:-left-10 md:-top-10 text-4xl font-bold animate-fadeIn">{year}</h1>
      <h1 className="font-semibold text-xl animate-fadeIn">{title}</h1>
      <a href={companyLink} className="text-gray-500 hover-scale">
        {company}
      </a>
      <p className="text-gray-600 dark:text-gray-400 my-2 animate-fadeIn delay-100">{desc}</p>
    </div>
  );
};
