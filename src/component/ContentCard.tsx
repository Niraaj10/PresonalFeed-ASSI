"use client";
import React from 'react';

export interface ContentCardsProps {
  title: string;
  description: string;
  image: string;
  imageHeight: string;
  imageWidth: string;
  source?: string;
  publishedAt?: string;
  showFav?: boolean;
  type?: "news" | "movie" | "social";
  contentId?: string;
  userId?: string;
  content?: ContentItem;
}


import { FC } from "react";
import axios from "axios";
import { ContentItem } from './dashboard/Trending';

const ContentCards: FC<ContentCardsProps> = ({
  title,
  description,
  image,
  source,
  publishedAt,
  showFav,
  contentId,
  userId,
  type,
  content,
}) => {
  const [isFavorited, setIsFavorited] = React.useState(false);
  
  const handleFavorite = async () => {
    if (!userId || !type || !contentId) return console.warn("Missing favorite info");

    try {
      const res = await axios.post("/api/favorites", {
        userId,
        contentId,
        type,
        content,
      });
      console.log("Favorite saved:", res.data);
      setIsFavorited(true)
    } catch (err) {
      console.error("Failed to save favorite", err);
    }
  };

  return (
    <li className="relative bg-zinc-900 rounded-xl border border-gray-400/10 overflow-hidden shadow-xl w-[400px] text-white">
      <div className="relative w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-transparent to-transparent px-3 py-2">
          <h2 className="text-white font-bold text-xs">{title}</h2>
        </div>
      </div>

      <div className=" px-4 py-3 bg-black overflow-hidden z-10">

          {showFav && userId && contentId && type && (
            <button
              onClick={handleFavorite}
              className={`mt-3 transition-colors ${isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              aria-label="Favorite"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill={isFavorited ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button>
          )}

        <div className="relative z-10">
          <p className="text-sm text-gray-400 mb-2 line-clamp-2 mt-2">{description}</p>

          <div className="flex justify-between items-center text-xs  text-gray-500">
            <span>{source}</span>
            <span>{publishedAt}</span>
          </div>

        </div>
      </div>
    </li>



  );
};

export default ContentCards;
