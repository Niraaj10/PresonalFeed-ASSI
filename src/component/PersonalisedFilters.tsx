"use client";

import React from "react";

type Genre = { id: string | number; name: string };

interface GenreFiltersProps {
  movieGenres: Genre[];
  newsGenres: Genre[];
  socialGenres: Genre[];
  selectedMovieGenres: string[];
  selectedNewsGenres: string[];
  selectedSocialGenres: string[];
  toggleMovieGenre: (id: string) => void;
  toggleNewsGenre: (id: string) => void;
  toggleSocialGenre: (id: string) => void;
}

export default function GenreFilters({
  movieGenres,
  newsGenres,
  socialGenres,
  selectedMovieGenres,
  selectedNewsGenres,
  selectedSocialGenres,
  toggleMovieGenre,
  toggleNewsGenre,
  toggleSocialGenre,
}: GenreFiltersProps) {
  const renderButtons = (
    genres: Genre[],
    selected: (string | number)[],
    toggle: (id: string) => void
  ) =>
    genres.map((genre) => (
      <button
        key={genre.id}
        onClick={() => toggle(String(genre.id))}
        className={`px-4 py-2 rounded-full border text-sm transition ${
          selected.includes(genre.id)
            ? "bg-blue-600 text-white"
            : "border-gray-400 text-gray-600 hover:bg-gray-100"
        }`}
      >
        {genre.name}
      </button>
    ));

  return (
    <div className="w-1/3 space-y-6 p-4 bg-transparent backdrop-blur-2xl border border-gray-400/20 rounded-xl">
      <div>
        <h2 className="text-lg font-semibold mb-2">Movie Genres</h2>
        <div className="flex flex-wrap gap-2">
          {renderButtons(movieGenres, selectedMovieGenres, toggleMovieGenre)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">News Topics</h2>
        <div className="flex flex-wrap gap-2">
          {renderButtons(newsGenres, selectedNewsGenres, toggleNewsGenre)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Social Tags</h2>
        <div className="flex flex-wrap gap-2">
          {renderButtons(socialGenres, selectedSocialGenres, toggleSocialGenre)}
        </div>
      </div>
    </div>
  );
}


