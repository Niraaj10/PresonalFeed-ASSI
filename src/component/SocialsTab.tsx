"use client";

import { useEffect, useRef, useState } from "react";
import ContentCards from "@/component/ContentCard";
import { getSocialMediaPosts, SocialMediaPost } from "@/lib/Socials";

export default function SocialsTab() {
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getSocialMediaPosts(limit)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLimit((prev) => prev + 5);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  return (
    <ul className="w-[400px] mx-auto py-4 space-y-6 mt-5">
      {posts.map((post, id) => (
        <ContentCards
        showFav={false}
          key={id}
          title={post.author}
          description={post.post}
          image={post.image}
          imageWidth="335px"
          imageHeight="500px"
        />
      ))}
      <div ref={loaderRef} className="h-10" />
      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 border-2 border-black border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      )}
    </ul>
  );
}