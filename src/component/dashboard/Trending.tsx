"use client";

import { useEffect, useRef, useState } from "react";
import ContentCards from "../ContentCard";
import { getSocialMediaPosts } from "@/lib/Socials";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface ContentItem {
  id: string | number;
  title: string;
  excerpt: string;
  thumbnail: string;
  publisher: { name: string };
  date: string;
  type: "news" | "movie" | "social";
}

type MovieApiItem = {
  id: string,
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
};

type NewsApiItem = {
  title: string;
  excerpt?: string;
  thumbnail?: string;
  source?: string;
  publishedAt?: string;
};

export default function Trending() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const hasMore = useRef(true);

  const user = useSelector((state: RootState) => state.user);
  // console.log(user)

  const shuffleArray = (array: ContentItem[]): ContentItem[] => {
    return array
      .map((value): { value: ContentItem; sort: number } => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((entry) => entry.value);
  };

  // Retry wrapper for movies
  const retryFetch = async <T = unknown>(
    url: string,
    retries = 5,
    delay = 1000
  ): Promise<T> => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      return await res.json();
    } catch (err) {
      if (retries > 0) {
        console.warn(`Retrying ${url} (${3 - retries + 1})`);
        await new Promise((r) => setTimeout(r, delay));
        return retryFetch(url, retries - 1, delay * 2);
      } else {
        console.error("Movie fetch failed after retries:", err);
        return [] as T;
      }
    }
  };


  const fetchTrendingData = async (page: number): Promise<ContentItem[]> => {
    try {
      const [movies, news, socials] = await Promise.all([
        retryFetch(`/api/movies?page=${page}`),
        fetch(`/api/news?limit=10&page=${page}`).then((res) => res.json()),
        getSocialMediaPosts(page * 10),
      ]);
      console.log('Movies:', movies)
      console.log('News:', news)

      const movieItems: ContentItem[] = Array.isArray(movies)
        ? movies.map((item: MovieApiItem) => ({
          id: item.id,
          title: item.title || item.name || "Untitled",
          excerpt: item.overview || "No description available.",
          thumbnail: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "/placeholder.jpg",
          publisher: { name: "TMDB" },
          date: item.release_date || "",
          type: "movie",
        }))
        : (console.warn("Invalid movie data format:", movies), []);

      const newsItems: ContentItem[] = Array.isArray(news?.data)
        ? news.data.map((item: NewsApiItem) => ({
          title: item.title || "Untitled",
          excerpt: item.excerpt || "No description available",
          thumbnail: item.thumbnail || "Unavalible",
          publisher: { name: "TMDB" },
          date: item?.publishedAt || "",
          type: "news",
        }))
        : (console.warn("Invalid news data format:", news), []);

      const socialItems: ContentItem[] = Array.isArray(socials)
        ? socials.map((item) => ({
          id: item.id,
          title: item.post.slice(0, 60),
          excerpt: item.post,
          thumbnail: item.image,
          publisher: { name: item.author },
          date: "",
          type: "social",
        }))
        : (console.warn("Invalid social data format:", socials), []);

      // if (!movieItems.length) {
      //   console.warn("No movie data found, skipping render this round.");
      //   return [];
      // }

      const combined = [...movieItems, ...newsItems, ...socialItems];
      console.log('Combined items:', combined);

      if (!combined.length) {
        hasMore.current = false;
      }


      return shuffleArray(combined);
    } catch (err) {
      console.error("Trending fetch error:", err);
      return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      if (loading || !hasMore.current) return;
      setLoading(true);
      const newItems = await fetchTrendingData(page);
      setItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    };
    load();
  }, [page]);

  return (
    <div className="w-full flex md:ml-7">
      <div className="w-full md:w-2xl h-[89vh] overflow-y-scroll hideScroll backdrop-blur-2xl bg-black border border-gray-400/20 rounded-xl">
        <nav className="sticky top-0 z-50 bg-black border-b border-gray-400/20 backdrop-blur-2xl text-sm text-white flex justify-around items-center h-14 w-full">
          Trending Now
        </nav>

        {items.length > 0 ? (
          <ul className="w-[400px] mx-auto py-4 space-y-6">
            {items.map((item, idx) => (
              <ContentCards
                showFav={true}
                key={idx}
                title={item.title}
                description={item.excerpt}
                image={item.thumbnail}
                imageWidth="335px"
                imageHeight="500px"
                source={`${item.publisher.name} • ${item.type}`}
                publishedAt={item.date}
                userId={user.email ?? undefined}
                contentId={item.id?.toString()}
                content={item}
                type={item.type}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-4 px-6"></p>
        )}


        <div className="flex justify-center py-4">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="px-4 py-2 text-xs text-gray-400 border border-gray-400/20 rounded-xl cursor-pointer bg-transparent hover:scale-105 disabled:opacity-50 transition-all duration-500"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>

      </div>
    </div>
  );
}





