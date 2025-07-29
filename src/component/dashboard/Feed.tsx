"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ContentCards from "../ContentCard";
import GenreFilters from "../PersonalisedFilters";
import { getSocialMediaPostsByGenres } from "@/lib/Socials";

type MovieApiItem = {
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
}

interface ContentItem {
    title: string;
    excerpt: string;
    thumbnail: string;
    publisher: { name: string };
    date: string;
    type: "news" | "movie" | "social";
}

const movieGenres = [
    { id: "28", name: "Action" },
    { id: "35", name: "Comedy" },
    { id: "18", name: "Drama" },
    { id: "10749", name: "Romance" },
    { id: "27", name: "Horror" },
    { id: "99", name: "Documentary" },
];

const newsGenres = [
    { id: "technology", name: "Technology" },
    { id: "business", name: "Business" },
    { id: "health", name: "Health" },
    { id: "sports", name: "Sports" },
    { id: "science", name: "Science" },
    { id: "entertainment", name: "Entertainment" },
];

const socialGenres = [
    { id: "funny", name: "Funny" },
    { id: "motivation", name: "Motivation" },
    { id: "coding", name: "Coding" },
    { id: "design", name: "Design" },
    { id: "tech", name: "Tech" },
];

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

export default function Feed() {
    const user = useSelector((state: RootState) => state.user);

    const [selectedMovieGenres, setSelectedMovieGenres] = useState<string[]>([]);
    const [selectedNewsGenres, setSelectedNewsGenres] = useState<string[]>([]);
    const [selectedSocialGenres, setSelectedSocialGenres] = useState<string[]>([]);

    const [feedItems, setFeedItems] = useState<ContentItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const hasMore = useRef(true);

    const shuffleArray = (array: ContentItem[]): ContentItem[] => {
        return array
            .map((value): { value: ContentItem; sort: number } => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map((entry) => entry.value);
    };


    const fetchGenreContent = async (
        genreType: "movie" | "news" | "social",
        genres: string[],
        page = 1
    ): Promise<ContentItem[]> => {
        if (!genres.length) return [];

        const baseURL =
            genreType === "movie"
                ? `/api/movies/genre?genres=${genres.join(",")}&page=${page}`
                : `/api/news/genre?genres=${genres.join(",")}&page=${page}`;

        try {
            if (genreType === "movie") {
                const res = await retryFetch<{ data: MovieApiItem[] }>(baseURL);
                if (!res?.data?.length) return [];

                return res.data.map((item): ContentItem => ({
                    title: item.title || item.name || "Untitled",
                    excerpt: item.overview || "No description available",
                    thumbnail: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                    publisher: { name: "TMDB" },
                    date: item.release_date || "",
                    type: "movie",
                }));
            }

            if (genreType === "news") {
                const res = await fetch(baseURL).then((r) => r.json());
                if (!res?.data?.length) return [];

                return res.data.map((item: NewsApiItem): ContentItem => ({
                    title: item.title || "Untitled",
                    excerpt: item.excerpt || "No description available",
                    thumbnail: item.thumbnail || "Unavalible",
                    publisher: { name: "TMDB" },
                    date: item?.publishedAt || "",
                    type: "news",
                }));
            }

            // Social content comes from local function
            const posts = await getSocialMediaPostsByGenres(genres, page);
            console.log(posts)
            return posts.map((item) => ({
                title: item.author || "User Post",
                excerpt: item.post || "",
                thumbnail: item.image || "/default.jpg",
                publisher: { name: item.hashtags?.[0] || "Social" },
                date: new Date().toISOString(),
                type: "social",
            }));
        } catch (err) {
            console.error(`${genreType} fetch error:`, err);
            return [];
        }
    };


    useEffect(() => {
        const loadInitialFeed = async () => {
            if (!user.isLoggedIn) return;

            setLoading(true);

            const moviePrefs = (user.moviePreferences ?? []).map(String);
            const newsPrefs = (user.newsPreferences ?? []).map(String);
            const socialPrefs = (user.socialPreferences ?? []).map(String);

            setSelectedMovieGenres(moviePrefs);
            setSelectedNewsGenres(newsPrefs);
            setSelectedSocialGenres(socialPrefs);

            const [movies, news, social] = await Promise.all([
                fetchGenreContent("movie", moviePrefs),
                fetchGenreContent("news", newsPrefs),
                fetchGenreContent("social", socialPrefs),
            ]);

            const combined = shuffleArray([...movies, ...news, ...social]);
            if (!combined.length) hasMore.current = false;
            console.log(combined)

            setFeedItems(combined);
            setLoading(false);
        };

        loadInitialFeed();
    }, [user]);

    const handleGenreChange = async (
        type: "movie" | "news" | "social",
        genres: string[]
    ) => {
        const data = await fetchGenreContent(type, genres);
        setFeedItems((prev) => shuffleArray([...prev, ...data]));
    };

    const handleLoadMore = async () => {
        if (loading || !hasMore.current) return;

        setLoading(true);
        const nextPage = page + 1;

        const [movies, news, social] = await Promise.all([
            fetchGenreContent("movie", selectedMovieGenres, nextPage),
            fetchGenreContent("news", selectedNewsGenres, nextPage),
            fetchGenreContent("social", selectedSocialGenres, nextPage),
        ]);

        const combined = shuffleArray([...movies, ...news, ...social]);
        if (!combined.length) hasMore.current = false;

        setFeedItems((prev) => [...prev, ...combined]);
        setPage(nextPage);
        setLoading(false);
    };

    const toggleGenre = useCallback(
        (
            genreId: string,
            current: string[],
            setter: React.Dispatch<React.SetStateAction<string[]>>,
            type: "movie" | "news" | "social"
        ) => {
            const updated = current.includes(genreId)
                ? current.filter((g) => g !== genreId)
                : [...current, genreId];

            setter(updated);
            handleGenreChange(type, updated);
        },
        []
    );

    return (
        <div className="w-full flex justify-center items-start gap-10 flex-row-reverse ">
            <GenreFilters
                movieGenres={movieGenres}
                newsGenres={newsGenres}
                socialGenres={socialGenres}
                selectedMovieGenres={selectedMovieGenres}
                selectedNewsGenres={selectedNewsGenres}
                selectedSocialGenres={selectedSocialGenres}
                toggleMovieGenre={(id) =>
                    toggleGenre(id, selectedMovieGenres, setSelectedMovieGenres, "movie")
                }
                toggleNewsGenre={(id) =>
                    toggleGenre(id, selectedNewsGenres, setSelectedNewsGenres, "news")
                }
                toggleSocialGenre={(id) =>
                    toggleGenre(id, selectedSocialGenres, setSelectedSocialGenres, "social")
                }
            />

            <div className="w-2xl h-[91vh] overflow-y-scroll hideScroll bg-black backdrop-blur-2xl border border-gray-400/20 rounded-xl">
                <nav className="sticky top-0 z-50 bg-black border-b border-gray-400/20 backdrop-blur-2xl text-sm text-white flex justify-around items-center h-14 w-full">
                    Personalized Feed
                </nav>

                {feedItems.length > 0 ? (
                    <ul className="w-[400px] mx-auto py-4 space-y-6 mt-5">
                        {feedItems.map((item, idx) => (
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
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 mt-4 px-6">
                        No content to show. Select some genres!
                    </p>
                )}

                {!loading && hasMore.current && feedItems.length > 0 && (
                    <div className="flex justify-center py-4">
                        <button
                            className="px-4 py-2 border border-gray-400/15 text-white rounded-xl duration-500 transition-all hover:bg-white hover:text-black hover:scale-105 cursor-pointer"
                            onClick={handleLoadMore}
                        >
                            Load More
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-4 border-black border-t-blue-500 rounded-full animate-spin" />
                    </div>
                )}
            </div>
        </div>
    );
}
