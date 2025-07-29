"use client";
import { useEffect, useRef, useState } from "react";
import ContentCards from "./ContentCard";

export interface NewsArticle {
  authors: string[];
  contentLength: number;
  date: string; 
  excerpt: string;
  keywords: string[];
  language: string;
  paywall: boolean;
  publisher: {
    name: string;
    url: string;
    favicon: string;
  };
  thumbnail: string;
  title: string;
  url: string;
}

export default function NewsTab() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/news?limit=10`);
        const data = await res.json();

        console.log('Fetched news:', data.data);

        setArticles((prev) => [...prev, ...data.data]);
      } catch (err) {
        console.error("Error fetching news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]);

  return (
    <div className="w-[400px] mx-auto py-4 space-y-6">
      <ul className="w-[400px] mx-auto py-4 space-y-6 mt-5 ">
        {articles.map((article, idx) => (
          <ContentCards
            showFav={false}
            key={idx}
            title={article.title}
            description={article.excerpt}
            image={article.thumbnail}
            imageWidth="335px"
            imageHeight="200px"
            source={article.publisher?.name ?? "Unknown"}
            publishedAt={article.date}
          />
        ))}
      </ul>

      <div ref={loaderRef} className="h-10" />

      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-4 border-black border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
