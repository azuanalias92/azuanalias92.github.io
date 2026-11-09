import React from "react";
import Link from "next/link";
import userData from "@constants/data";
import SurveyMap from "./SurveyMap";

export default function Blog() {
  const posts = userData.blog || [];
  const [lead, ...rest] = posts;

  return (
    <>
      <section className="page-head page-head--map">
        <SurveyMap seed={67} scrim="banner" plotsAt={0.6} />
        <div className="container">
          <h1>Blog</h1>
        </div>
      </section>
      <section className="section--tight" aria-label="Posts">
        <div className="container">
          {lead ? (
            <>
              <BlogPostCard lead title={lead.title} summary={lead.summary} date={lead.date} slug={lead.slug} image={lead.image} />
              {rest.length > 0 && (
                <ul className="ruled post-list">
                  {rest.map((post, idx) => (
                    <li key={idx}>
                      <BlogPostCard title={post.title} summary={post.summary} date={post.date} slug={post.slug} image={post.image} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div className="empty">
              <h2>Blog posts coming soon!</h2>
              <p>I&rsquo;m working on some interesting articles to share with you. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const BlogPostCard = ({ title, summary, date, slug, image, lead }) => {
  if (lead) {
    return (
      <Link href={`/blog/${slug}`} className="post-lead">
        {image && (
          <div className="photo post-lead__photo" data-slot="post-lead" data-alt={`Cover for ${title}`}>
            <img src={image} alt={title} width="1600" height="1100" />
          </div>
        )}
        <div>
          <p className="post-meta">{date}</p>
          <h2>{title}</h2>
          <p className="post-summary">{summary}</p>
          <span className="post-more">Read more</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${slug}`} className="post-row">
      <p className="post-meta">{date}</p>
      <div>
        <h3>{title}</h3>
        <p className="post-summary">{summary}</p>
        <span className="post-more">Read more</span>
      </div>
      {image && (
        <div className="photo post-row__thumb" data-slot={`post-${slug}`} data-alt={`Cover for ${title}`}>
          <img src={image} alt={title} width="1600" height="1000" loading="lazy" />
        </div>
      )}
    </Link>
  );
};
