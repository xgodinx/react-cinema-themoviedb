import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, searchMovies } from "../services/api";

import "../css/Home.css";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: number;
};

export default function Home() {
  const [movies, setmovies] = useState<Movie[]>([]);
  const [queryValue, setQueryValue] = useState("");
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      async function loadPopularMovies() {
        try {
          const popularMovies = await getPopularMovies();
          setmovies(popularMovies);
          console.log(popularMovies);
        } catch (e) {
          setError("failed to fetch");
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
      loadPopularMovies();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setmovies([]);
    setTimeout(async () => {
      const searchedMovies = await searchMovies(queryValue);
      setLoading(false);
      setmovies(searchedMovies);
    }, 1000);
  }

  return (
    <div className="home-container">
      <h1 className="home__title">Welcome! Find your film</h1>
      <form action="#" className="home__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search your film..."
          className="search__input"
          value={queryValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQueryValue(e.target.value)
          }
        />
        <button type="submit" className="search__btn">
          Search
        </button>
      </form>
      {error ? <p>{error}</p> : null}
      {!error && !movies.length && !loading && (
        <p className="not__found">Not found</p>
      )}
      {loading ? (
        <p className="loading-movies">Loading...</p>
      ) : (
        <div className="movie-cards-grid">
          {movies.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
}
