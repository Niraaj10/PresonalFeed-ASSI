"use client";

import { signIn } from "next-auth/react";

export default function Login() {
    return (

        <div className="font-sans flex flex-col justify-center items-center relative overflow-hidden min-h-screen bg-black ">

            <div className="spin my-auto absolute top-0 left-0 w-full h-full">
                <div className="bg-glow-red"></div>
                <div className="bg-glow-purple"></div>
            </div>
            <div className="bg-glow-green"></div>

            <div className="relative z-10 p-8 w-full max-w-md mx-auto bg-transparent border border-gray-400/20 rounded-lg shadow-lg text-center">
                <h1 className="text-white text-xl mb-6">Sign in</h1>

                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}
