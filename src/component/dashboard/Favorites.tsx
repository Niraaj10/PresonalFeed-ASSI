"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ContentCards from "../ContentCard";

interface FavoriteItem {
    _id: string;
    contentId: string;
    type: string;
    content: {
        title: string;
        excerpt: string;
        thumbnail: string;
        source?: string;
        publisher: {
            name: string;
        };
        publishedAt?: string;
        url?: string;
        imageWidth: string;
        imageHeight: string;
        date?: string;
    };
}

export default function Favorites() {
    const { data: session } = useSession();
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [loading, setLoading] = useState(false);

    const user = useSelector((state: RootState) => state.user);
    console.log(user.email, "User email in FavoritesTab");

    useEffect(() => {
        if (!user?.email) return;

        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/favorites?userId=${user.email}`);
                const data = await res.json();
                console.log(data, "Fetched favorites data");
                if (Array.isArray(data.favorites)) {
                    setFavorites(data.favorites);
                }
            } catch (err) {
                console.error("Failed to fetch favorites", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [user?.email]);

    return (
        <div className="w-full flex md:ml-7">
            <div className="w-full md:w-2xl h-[91vh] overflow-y-scroll hideScroll backdrop-blur-2xl bg-black border border-gray-400/20 rounded-xl">
                <div className="sticky top-0 z-50 bg-black border-b border-gray-400/20 backdrop-blur-2xl text-sm text-white flex justify-around items-center h-14 w-full">
                    Your Favorites
                </div>


                {loading ? (
                    <div className="flex justify-center py-4">
                        <div className="w-6 h-6 border-4 border-black border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : favorites.length === 0 ? (
                    <p className="text-gray-500">You have no favorites yet.</p>
                ) : (
                    <ul className="w-[400px] mx-auto py-4 space-y-6">
                        {favorites.map((fav) => (
                            <ContentCards
                                key={fav._id}
                                title={fav.content.title}
                                description={fav.content.excerpt}
                                image={fav.content.thumbnail}
                                source={fav.content.publisher.name}
                                imageWidth={fav.content.imageWidth}
                                imageHeight={fav.content.imageHeight}
                                publishedAt={fav.content.date}
                                showFav={false}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
