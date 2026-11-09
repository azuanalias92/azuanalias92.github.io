import React from "react";
import { useRouter } from "next/router";
import ContainerBlock from "../../components/ContainerBlock";
import userData from "@constants/data";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Find the blog post with the matching slug
  const post = userData.blog?.find((post) => post.slug === slug);

  if (!post && typeof window !== "undefined") {
    router.push("/blog");
    return null;
  }

  return (
    <ContainerBlock title={post?.title || "Blog Post - Azuan Alias"} description={post?.summary || "Blog post by Azuan Alias"}>
      <article className="article">
        <div className="container">
          {post ? (
            <>
              <header className="article__head">
                <p className="post-meta">{post.date}</p>
                <h1>{post.title}</h1>
                <p className="lead article__summary">{post.summary}</p>
              </header>

              {post.image && (
                <div className="photo article__cover" data-slot="cover" data-alt={`Cover for ${post.title}`}>
                  <img src={post.image} alt={post.title} width="1600" height="900" fetchPriority="high" />
                </div>
              )}

              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            </>
          ) : (
            <div className="article__head not-found">
              <h1>Post not found</h1>
              <p>The blog post you&rsquo;re looking for doesn&rsquo;t exist or has been removed.</p>
            </div>
          )}
        </div>
      </article>
    </ContainerBlock>
  );
}
