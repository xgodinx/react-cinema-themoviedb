import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MoviesContext";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: number;
};

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { addToFavorites, removeFromFavorites, isInFavorites } =
    useMovieContext();

  const favorite = isInFavorites(movie.id);
  function onHandleClick() {
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie__card card">
      <div className="card__image">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="card__title">{movie.title}</div>
      <div className="card__release-date">{movie.release_date}</div>
      <button type="button" className="card__button" onClick={onHandleClick}>
        {favorite ? "Remove from favorites" : "Add to favorites"}
      </button>
    </div>
  );
}
