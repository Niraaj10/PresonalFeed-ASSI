'use client';

import { RootState } from "@/store";
import { clearUser } from "@/store/slices/userSlice";
import { signOut } from "next-auth/react";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import SearchOverlay from "./SearchBar";
import { RiSearch2Line } from "react-icons/ri";
import { FiAlignCenter } from "react-icons/fi";

const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-caveat',
    display: 'swap',
});

type HeaderProps = {
    onToggleSidebar: () => void;
};


export default function Header({ onToggleSidebar }: HeaderProps) {
    const [showSearch, setShowSearch] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    console.log(user)

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        signOut();
    };
    return (
        <header className="header z-40 border border-white/5 mx-1 md:mx-5 mt-5 rounded-2xl fixed bg-transparent backdrop-blur-sm md:w-[97%] w-[98%] p-3 md:px-7 flex justify-between items-center">
            <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />

            <div className="flex items-center gap-2">

                <span style={{ fontFamily: 'var(--font-caveat)' }} className={`${caveat.variable} font-extralight text-sm md:text-[30px]`}>Personalized Feed</span>
            </div>



            <div className="hidden md:block">
                <button onClick={() => setShowSearch(true)}>
                    <span

                        className=" px-4 py-3 flex justify-start items-center gap-1 border border-gray-400/20 bg-black/30 text-gray-500 text-sm rounded-md outline-none"
                    >
                        <span className="text-lg ">

                            <RiSearch2Line />
                        </span>

                        <span className="mr-0-4 hidden md:block">Search...</span>
                    </span>
                </button>
            </div>

            <div className="flex items-center justify-center gap-3 cursor-pointer">
                <div className="md:hidden flex justify-center items-center gap-2">
                    <button className="mt-0.5" onClick={() => setShowSearch(true)}> <RiSearch2Line /> </button>

                    <button className="md:hidden" onClick={onToggleSidebar}>
                        <span className="text-2xl text-white"> <FiAlignCenter /> </span>
                    </button>
                </div>

                {user.name ? (
                    <>
                        <span className="text-sm font-semibold hidden md:block text-white/80">{user.name}</span>
                        <button
                            data-testid="logout-button"
                            onClick={() => handleLogout()}
                            className="bg-white text-black rounded-xl px-2 md:px-4 py-1 md:py-2 hover:bg-transparent border border-gray-400/15 hover:text-white duration-300 transition-all hover:scale-110 text-2xl"
                        >
                            <HiOutlineLogout />
                        </button>
                    </>
                ) : (
                    <Link href="/login" className="flex justify-center w-full">
                        <button className="w-full bg-white text-black rounded-xl flex justify-between items-center gap-2 text px-2 md:px-4 py-1 md:py-2 border border-gray-400/15 hover:bg-black  hover:text-white text-xs md:text-base hover:scale-103 duration-300 transition-all">
                            Log In
                            <span className="text-2xl md:ml-5">
                                <HiOutlineLogin />
                            </span>
                        </button>
                    </Link>
                )}


            </div>

        </header>
    )
}