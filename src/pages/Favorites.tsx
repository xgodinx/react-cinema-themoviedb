import { useMovieContext } from "../contexts/MoviesContext";
import MovieCard from "../components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: number;
};
export default function Favorites() {
  const { favorites } = useMovieContext();

  console.log(favorites);

  return (
    <div>
      {!favorites.length ? (
        <p className="not__found">No movies yet</p>
      ) : (
        <div className="movie-cards-grid">
          {favorites.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id}></MovieCard>
          ))}
        </div>
      )}
    </div>
  );
}
