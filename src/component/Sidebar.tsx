"use client";

import { RootState } from "@/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineHome, HiOutlineLogout } from "react-icons/hi";
import { HiOutlineLogin } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { useState } from "react";
import { clearUser } from "@/store/slices/userSlice";

type SidebarProps = {
    setActiveTab: (tab: string) => void;
    activeTab: string;
    setDashboardSubTab: (tab: "feed" | "trending" | "favorites") => void;
    dashboardSubTab: "feed" | "trending" | "favorites";
};

export default function Sidebar({ setActiveTab, activeTab, setDashboardSubTab, dashboardSubTab }: SidebarProps) {

    const user = useSelector((state: RootState) => state.user);
    console.log(user)
    const [isDashboardOpen, setDashboardOpen] = useState(true)

    const handleDashboardClick = () => {
        if (activeTab === "dashboard") {
                        setDashboardOpen(prev => !prev);
        } else {
            setActiveTab("dashboard");
            setDashboardOpen(true); 
        }
    };

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        signOut();
    };

    return (
        <div className="bg-transparent backdrop-blur-2xl border border-gray-400/15 rounded-2xl text-white w-96 p-4 flex flex-col justify-between items-start">
            <ul className="flex flex-col justify-between items-start gap-6 px-5 mt-10 w-full">
                <li onClick={() => setActiveTab("home")} className={`w-full border px-4 py-4 border-gray-400/10 rounded-xl flex gap-5 justify-start items-center ${activeTab === "home" ? "text-black bg-white" : ""}`}>
                    <span className="text-xl">
                        <HiOutlineHome />
                    </span>
                    Home
                </li>

                <li
                    className={`w-full border px-5 py-2 border-gray-400/10 rounded-xl flex flex-col items-start ${activeTab === "dashboard" ? "text-black bg-white" : ""
                        }`}
                >
                    <div
                        onClick={handleDashboardClick}
                        className="flex items-center gap-3 py-2 w-full cursor-pointer"
                    >
                        <LuLayoutDashboard />
                        Dashboard
                    </div>

                    <div
                        className={`w-full ml-6 overflow-hidden transition-all duration-300 ease-in-out ${activeTab === "dashboard" && isDashboardOpen
                            ? "max-h-32 opacity-100 pt-2"
                            : "max-h-0 opacity-0 pt-0"
                            }`}
                    >
                        <ul className="flex flex-col gap-2 text-sm">
                            <li
                                onClick={() => setDashboardSubTab("feed")}
                                className={`cursor-pointer hover:text-blue-400 ${dashboardSubTab === "feed" ? "text-blue-400" : "text-gray-400"
                                    }`}
                            >
                                Personalized Feed
                            </li>
                            <li
                                onClick={() => setDashboardSubTab("trending")}
                                className={`cursor-pointer hover:text-blue-400 ${dashboardSubTab === "trending" ? "text-blue-400" : "text-gray-400"
                                    }`}
                            >
                                Trending
                            </li>
                            <li
                                onClick={() => setDashboardSubTab("favorites")}
                                className={`cursor-pointer hover:text-blue-400 ${dashboardSubTab === "favorites" ? "text-blue-400" : "text-gray-400"
                                    }`}
                            >
                                Favorites
                            </li>
                        </ul>
                    </div>
                </li>

                <li onClick={() => setActiveTab("profile")} className={`w-full border px-5 py-4 border-gray-400/10 rounded-xl flex gap-5 justify-start items-center ${activeTab === "profile" ? "text-black bg-white" : ""}`}>
                    <FaRegUser />
                    Profile
                </li>

            </ul>

            <div className="w-full border border-gray-400/15 rounded-2xl p-2 h-fit">
                {
                    user.name ? (
                        <div className="flex justify-between items-center w-full p-2 px-4">
                            <div className="text-white mr-4">
                                <span className="font-bold">{user.name}</span>
                            </div>
                            <button
                                onClick={() => handleLogout()}
                                className="bg-white text-black rounded-xl px-4 py-2 hover:bg-transparent border border-gray-400/15 hover:text-white duration-300 transition-all hover:scale-110 text-2xl"
                            >
                                <HiOutlineLogout />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="flex justify-center w-full">
                                <button className="w-full bg-white text-black rounded-xl flex justify-between items-center text px-4 py-2 border border-gray-400/15 hover:bg-black  hover:text-white hover:scale-103 duration-300 transition-all">
                                    Sign In
                                    <span className="text-2xl">
                                        <HiOutlineLogin />
                                    </span>
                                </button>
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    )
}