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

const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-caveat',
    display: 'swap',
});


export default function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    console.log(user)

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        signOut();
    };
    return (
        <header className="header z-50 border border-white/5 mx-5 mt-5 rounded-2xl fixed bg-transparent backdrop-blur-sm w-[97%] p-3 px-7 flex justify-between items-center">
            <SearchOverlay open={showSearch} onClose={() => setShowSearch(false)} />

            <div className="flex items-center gap-2">
                
                <span style={{ fontFamily: 'var(--font-caveat)' }} className={`${caveat.variable} font-extralight text-[30px]`}>Personalized Feed</span>
            </div>

           

            <div>
                <button onClick={() => setShowSearch(true)}>
                    <span
                        
                            className=" px-4 py-3 flex justify-start items-center gap-1 border border-gray-400/20 bg-black/30 text-gray-500 text-sm rounded-md outline-none"
                        >
                            <span className="text-lg ">

                            <RiSearch2Line />
                            </span>

                            <span className="mr-0-4">Search...</span>
                        </span>
                </button>
            </div>

            <div className="flex items-center gap-3 cursor-pointer">
                {user.name ? (
                    <>
                        <span className="text-sm font-semibold text-white/80">{user.name}</span>
                        <button
                            data-testid="logout-button"
                            onClick={() => handleLogout()}
                            className="bg-white text-black rounded-xl px-4 py-2 hover:bg-transparent border border-gray-400/15 hover:text-white duration-300 transition-all hover:scale-110 text-2xl"
                        >
                            <HiOutlineLogout />
                        </button>
                    </>
                ) : (
                    <Link href="/login" className="flex justify-center w-full">
                        <button className="w-full bg-white text-black rounded-xl flex justify-between items-center text px-4 py-2 border border-gray-400/15 hover:bg-black  hover:text-white hover:scale-103 duration-300 transition-all">
                            Log In
                            <span className="text-2xl ml-5">
                                <HiOutlineLogin />
                            </span>
                        </button>
                    </Link>
                )}


            </div>

        </header>
    )
}