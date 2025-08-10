import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function Blog() {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto h-48 bg-white dark:bg-gray-800">
        <h1 className="text-5xl md:text-9xl font-bold py-20 text-center md:text-left animate-slideInFromLeft">Blog</h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-10">
        <div className="max-w-6xl mx-auto px-4 py-20">
          {userData.blog && userData.blog.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
              {userData.blog.map((post, idx) => (
                <BlogPostCard
                  key={idx}
                  title={post.title}
                  summary={post.summary}
                  date={post.date}
                  slug={post.slug}
                  image={post.image}
                />
              ))}
            </div>
          ) : (
            <div className="text-center animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                Blog posts coming soon!
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 animate-pulse">
                I'm working on some interesting articles to share with you. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const BlogPostCard = ({ title, summary, date, slug, image }) => {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <div className="overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-700 animate-fadeIn">
        {image && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-fadeIn delay-200">{date}</p>
          <h3 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white animate-fadeIn">{title}</h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 animate-fadeIn delay-100">{summary}</p>
          <div className="mt-4 flex items-center hover-lift">
            <span className="text-blue-600 dark:text-blue-400 font-medium">Read more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4 text-blue-600 dark:text-blue-400"
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
    </Link>
  );
};