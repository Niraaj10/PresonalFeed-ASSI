'use client';

import { useEffect, useState } from "react";
import NewsTab from "../NewsTab";
import MovieTab from "../MovieTab";
import SocialsTab from "../SocialsTab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/userSlice";

export default function HomeSection() {
    const [activeTab, setActiveTab] = useState<"news" | "movies" | "socials">("socials");
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    // console.log(user)

    

    useEffect(() => {
        const fetchFullUser = async () => {
            if (!user.email) return;
            if (
                user.moviePreferences?.length &&
                user.newsPreferences?.length &&
                user.socialPreferences?.length
            ) {
                return;
            }

            try {
                const res = await fetch(`/api/user/${user.email}`);
                if (!res.ok) throw new Error("Failed to fetch user");
                const data = await res.json();
                dispatch(setUser(data));
            } catch (error) {
                console.error("Error fetching full user data:", error);
            }
        };

        fetchFullUser();
    }, [user.email]);

    return (
        <div className="rounded-2xl  w-2xl overflow-hidden">

            <nav className="sticky rounded-tr-2xl top-0 z-50 bg-black border-b border-gray-400/20  backdrop-blur-2xl text-sm text-white flex justify-around items-center h-14 w-2xl ">
                <button
                    onClick={() => setActiveTab("news")}
                    className={`cursor-pointer px-4 py-2 border-r border-gray-400/20 w-full ${activeTab === "news" ? "text-white font-bold scale-110" : "text-gray-400"}`}
                >
                    News
                </button>
                <button
                    onClick={() => setActiveTab("movies")}
                    className={`cursor-pointer px-4 py-2 border-r border-gray-400/20 w-full ${activeTab === "movies" ? "text-white font-bold scale-110" : "text-gray-400"}`}
                >
                    Movies
                </button>
                <button
                    onClick={() => setActiveTab("socials")}
                    className={`cursor-pointer px-4 py-2 w-full ${activeTab === "socials" ? "text-white font-bold scale-110" : "text-gray-400"}`}
                >
                    Socials
                </button>
            </nav>

            <div className="flex-grow h-[91vh] pb-24 w-2xl flex items-start justify-start  bg-black overflow-scroll hideScroll rounded-br-2xl">
                {activeTab === "news" && <NewsTab />}
                {activeTab === "movies" && <MovieTab />}
                {activeTab === "socials" && <SocialsTab />}
            </div>
        </div>

    )
}