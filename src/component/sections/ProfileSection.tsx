'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setUser } from '@/store/slices/userSlice';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const movieGenres = [
    { id: "28", name: 'Action' },
    { id: "35", name: 'Comedy' },
    { id: "18", name: 'Drama' },
    { id: "10749", name: 'Romance' },
    { id: "27", name: 'Horror' },
    { id: "99", name: 'Documentary' },
];

const newsGenres = [
    { id: 'technology', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'health', name: 'Health' },
    { id: 'sports', name: 'Sports' },
    { id: 'science', name: 'Science' },
    { id: 'entertainment', name: 'Entertainment' },
];

const socialGenres = [
    { id: 'funny', name: 'Funny' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'coding', name: 'Coding' },
    { id: 'design', name: 'Design' },
    { id: 'tech', name: 'Tech' },
];

export default function ProfileSection() {
    const user = useSelector((state: RootState) => state.user);
    console.log(user)
    const dispatch = useDispatch();

    const { status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [status]);

    const updatePreferencesInDB = async (updatedPrefs: {
        moviePreferences: string[];
        newsPreferences: string[];
        socialPreferences: string[];
    }) => {
        try {
        
            const res = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    movie: updatedPrefs.moviePreferences,
                    news: updatedPrefs.newsPreferences,
                    social: updatedPrefs.socialPreferences,
                }),
            });

        } catch (err) {
            console.error('Failed to update preferences in DB', err);
        }
    };

    const handleToggle = <T extends string | number>(
        type: 'moviePreferences' | 'newsPreferences' | 'socialPreferences',
        id: T
    ) => {
        const current = (user[type] as T[]) ?? [];
        const updatedArray = current.includes(id)
            ? current.filter((g) => g !== id)
            : [...current, id];

        const updatedUser = {
            ...user,
            [type]: updatedArray,
        };

        dispatch(setUser(updatedUser));
        updatePreferencesInDB({
            moviePreferences: type === 'moviePreferences' ? updatedArray as string[] : user.moviePreferences ?? [],
            newsPreferences: type === 'newsPreferences' ? updatedArray as string[] : user.newsPreferences ?? [],
            socialPreferences: type === 'socialPreferences' ? updatedArray as string[] : user.socialPreferences ?? [],
        });
    };

    const renderButtons = <T extends string | number>(
        genres: { id: T; name: string }[],
        selected: T[] = [],
        onToggle: (id: T) => void
    ) =>
        genres.map((genre) => (
            <button
                key={genre.id}
                onClick={() => onToggle(genre.id)}
                className={`px-4 py-2 rounded-full border text-sm transition ${selected.includes(genre.id)
                    ? 'bg-purple-600 border-none text-white'
                    : 'border-gray-400/15 text-gray-600 hover:bg-gray-100'
                    }`}
            >
                {genre.name}
            </button>
        ));

    return (
        <section className="w-full h-full mx-auto p-6 bg-black backdrop-blur-md border border-gray-600/30 rounded-xl shadow-md space-y-6">
            <h1 className="text-2xl font-bold pb-5 text-white border-b border-gray-400/15">Your Profile</h1>


            <div className='w-full pb-5 flex justify-start items-center gap-10 border-b border-gray-400/15'>
                <div>
                    <Image src={user.image || '/profile.jpg'} width={100} height={100} alt="Profile" className="w-24 h-24 rounded-full mb-4 bg-gray-600 object-cover" />
                </div>
                <div className="mb-4">
                    <h2 className="text-lg text-white font-semibold">{user.name}</h2>
                    <span className="text-gray-400">{user.email}</span>
                </div>
            </div>

            <div className='flex flex-col gap-6'>
                <div className="space-y-4">
                    <h2 className="text-lg text-white font-semibold">Movie Genres</h2>
                    <div className="flex flex-wrap gap-2">
                        {renderButtons(
                            movieGenres,
                            user.moviePreferences ?? [],
                            (id) => handleToggle('moviePreferences', id)
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg text-white font-semibold">News Topics</h2>
                    <div className="flex flex-wrap gap-2">
                        {renderButtons(
                            newsGenres,
                            user.newsPreferences ?? [],
                            (id) => handleToggle('newsPreferences', id)
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg text-white font-semibold">Social Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {renderButtons(
                            socialGenres,
                            user.socialPreferences ?? [],
                            (id) => handleToggle('socialPreferences', id)
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
