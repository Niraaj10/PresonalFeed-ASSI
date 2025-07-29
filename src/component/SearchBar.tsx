'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { getSocialMediaPostsBySearch } from '@/lib/Socials';
import { RiSearch2Line } from 'react-icons/ri';

type MovieItem = {
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    release_date?: string;
};

type NewsItem = {
    title: string;
    excerpt?: string;
    thumbnail?: string;
    source?: string;
    publishedAt?: string;
};

type SocialItem = {
    author: string;
    post: string;
    image?: string;
    hashtags?: string[];
};


type ResultItem = {
    title: string;
    excerpt: string;
    thumbnail: string;
    publisher: { name: string };
    date: string;
    type: 'movie' | 'news' | 'social';
};

const TABS = ['all', 'movie', 'news', 'social'] as const;
type TabType = typeof TABS[number];

export default function SearchOverlay({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [query, setQuery] = useState('');
    const [tab, setTab] = useState<TabType>('all');
    const [results, setResults] = useState<ResultItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [manualTrigger, setManualTrigger] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedQuery = useDebounce(query, 500);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
            setResults([]);
        }
    }, [open]);

    const retryFetch = async <T = unknown> (
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

    const fetchResults = async (q: string) => {
        if (!q) return;
        setLoading(true);
        try {
            const [movieRes, newsRes, socialRes] = await Promise.all([
                retryFetch<MovieItem[]>(`/api/movies/search?q=${q}`),
                retryFetch<{data: NewsItem[] }>(`/api/news/search?q=${q}`),
                getSocialMediaPostsBySearch(q) as Promise<SocialItem[]>,
            ]);

            console.log(movieRes, "Movie search results");

            const movies: ResultItem[] = Array.isArray(movieRes)
                ? (movieRes as MovieItem[]).map((item: MovieItem) => ({
                    title: item.title || item.name || 'Untitled',
                    excerpt: item.overview || 'No description available.',
                    thumbnail: item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/default-movie.jpg',
                    publisher: { name: 'TMDB' },
                    date: item.release_date || '',
                    type: 'movie',
                }))
                : [];


            const news: ResultItem[] = newsRes?.data?.map((item: NewsItem) => ({
                title: item.title,
                excerpt: item.excerpt || '',
                thumbnail: item.thumbnail || '/default-news.jpg',
                publisher: { name: item.source || 'News' },
                date: item.publishedAt || '',
                type: 'news',
            })) || [];

            const social: ResultItem[] = (socialRes as SocialItem[])?.map((item) => ({
                title: item.author,
                excerpt: item.post,
                thumbnail: item.image || '/default.jpg',
                publisher: { name: item.hashtags?.[0] || 'Social' },
                date: new Date().toISOString(),
                type: 'social',
            })) || [];

            setResults([...movies, ...news, ...social]);
        } catch (err) {
            console.error('Search error:', err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedQuery && !manualTrigger) {
            fetchResults(debouncedQuery);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if (manualTrigger) {
            fetchResults(query);
            setManualTrigger(false);
        }
    }, [manualTrigger]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setManualTrigger(true);
        }
    };

    const filteredResults =
        tab === 'all' ? results : results.filter((item) => item.type === tab);

    return (
        <AnimatePresence >
            {open && (
                <motion.div
                    className="fixed inset-0 z-30 -mx-5 -my-5 flex items-center justify-center px-4 py-12 h-screen w-[100vw] bg-white/10 backdrop-blur-[200px] "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className='bg-black/70 backdrop-blur-2xl rounded-xl w-full max-w-3xl p-6 shadow-lg mb-6 h-full overflow-hidden'
                        ref={modalRef}
                    >
                        <div className="w-full max-w-3xl  p-6 shadow-lg">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search..."
                                className="w-full text-lg px-4 py-3 border border-gray-400/20 bg-black/30 text-white focus:ring-2 focus:ring-gray-400-500 rounded-md outline-none"
                            />
                            <div className="flex justify-center space-x-4 mt-4">
                                {TABS.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTab(t)}
                                        className={`px-4 py-1 rounded-full text-sm capitalize transition-all duration-500 cursor-pointer ${tab === t
                                            ? 'bg-white text-black font-semibold'
                                            : 'text-white hover:scale-105'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={`text-gray-300 bg-black p-4 rounded-2xl backdrop-blur-2xl text-center w-full max-w-3xl min-h-[200px] `}>
                            {query ? (
                                loading ? (
                                    <p className="text-sm text-blue-400 animate-pulse">Searching...</p>
                                ) : filteredResults.length > 0 ? (
                                    <ul className="space-y-4 h-[65vh] overflow-y-auto hideScroll">
                                        {filteredResults.map((item, i) => (
                                            <li
                                                key={i}
                                                className="bg-purple-900/10 rounded-2xl p-4   text-left hover:bg-purple-700/15 transition flex gap-4"
                                            >
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="w-16 h-24 object-cover rounded"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-white">{item.title}</h3>
                                                    <p className="text-sm text-gray-400 line-clamp-2">{item.excerpt}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {item.publisher.name} • {item.date?.slice(0, 10)}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-400">No results found.</p>
                                )
                            ) : (
                                <div className="flex flex-col items-center opacity-50 pt-10">
                                    <RiSearch2Line size={32} />
                                    <p className="mt-2">Start typing to search or press Enter...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
