"use client";

import { signIn } from "next-auth/react";

export default function Login() {
    return (

        <div className="font-sans flex flex-col justify-center items-center relative min-h-screen bg-transparent overflow-hidden px-4">
            {/* Animated background */}
            <div className="absolute top-0 left-0 w-full h-full spin z-0">
                <div className="bg-glow-red"></div>
                <div className="bg-glow-purple"></div>
            </div>
            <div className="bg-glow-green z-0"></div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md bg-black/10 backdrop-blur-lg border border-gray-400/20 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                <h1 className="text-white text-2xl sm:text-3xl font-semibold mb-6">Sign in</h1>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="w-full bg-gradient-to-br from-[#a35cff] to-[#2bb3bd] cursor-pointer hover:bg-white text-white py-2 px-4 rounded-lg text-base sm:text-lg font-medium transition-all duration-500 hover:scale-110"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
