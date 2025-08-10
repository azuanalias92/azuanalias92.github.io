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
    <ContainerBlock
      title={post?.title || "Blog Post - Azuan Alias"}
      description={post?.summary || "Blog post by Azuan Alias"}
    >
      <div className="max-w-4xl mx-auto px-4 py-10">
        {post ? (
          <div className="animate-fadeIn">
            {post.image && (
              <div className="relative h-64 md:h-96 w-full mb-8 overflow-hidden rounded-xl animate-fadeIn delay-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
            )}
            
            <div className="mb-6">
              <p className="text-gray-500 dark:text-gray-400 animate-fadeIn delay-200">{post.date}</p>
              <h1 className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white animate-slideInFromLeft">
                {post.title}
              </h1>
            </div>
            
            <div className="prose prose-lg dark:prose-dark max-w-none animate-fadeIn delay-300">
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                {post.summary}
              </p>
              
              {/* This would be replaced with actual blog content */}
              <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
                <p className="animate-fadeIn delay-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel
                  ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                  Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
                  nisl sit amet nisl.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 animate-slideInFromLeft delay-500">
                  Getting Started
                </h2>
                
                <p className="animate-fadeIn delay-600">
                  Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
                  nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
                  nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
                
                <ul className="list-disc pl-6 my-4 animate-fadeIn delay-700">
                  <li>First item in the list</li>
                  <li>Second item in the list</li>
                  <li>Third item in the list</li>
                </ul>
                
                <p className="animate-fadeIn delay-800">
                  Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
                  nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
                  nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 animate-slideInFromLeft delay-900">
                  Conclusion
                </h2>
                
                <p className="animate-fadeIn delay-1000">
                  Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl
                  nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam
                  nisl, eget aliquam nisl nisl sit amet nisl.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white animate-slideInFromLeft">Post not found</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 animate-fadeIn delay-100">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
          </div>
        )}
      </div>
    </ContainerBlock>
  );
}