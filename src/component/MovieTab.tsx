"use client";
import { useEffect, useRef, useState } from "react";
import ContentCards from "./ContentCard";


interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  genre_ids: number[];
  adult: boolean;
}

const imageUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieTab() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // const cachedPage = useSelector((state: RootState) => state.movies.data[page]);
  // console.log(cachedPage + " cached page");
  // console.log(cacheMovies + " cache movies");
  // const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loading]);


  useEffect(() => {

    const fetchMovies = async () => {
      // if (cachedPage) {
      //     setMovies((prev) => [...prev, ...cachedPage]);
      //     return;
      //   }

      setLoading(true);
      try {
        const res = await fetch(`/api/movies?page=${page}`);
        const data = await res.json();
        console.log("Movies : " + data)

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setMovies((prev) => [...prev, ...data]);
      } catch (err) {
        console.error("Error fetching movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="w-[400px] mx-auto py-4 space-y-6">

      <ul className="w-[400px] mx-auto py-4 space-y-6 mt-5">
        {movies.map((movie, idx) => (
          <ContentCards
          showFav={false}
            key={idx}
            title={movie.title}
            description={movie.overview}
            image={`${imageUrl}${movie.poster_path}`}
            imageWidth="335px"
            imageHeight="500px"
            source="TMDB"
            publishedAt={movie.release_date}
          />
        ))}
      </ul>

      <div ref={loaderRef} className="h-10" />

      {loading && (
       <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-4 border-black border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
