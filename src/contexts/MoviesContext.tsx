import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: number;
};

type ContextValue = {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isInFavorites: (movieId: number) => boolean;
};
type MovieContextProps = {
  children: ReactNode;
};
const MovieContext = createContext<ContextValue | null>(null);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) throw new Error("context problems");
  return context;
};

export function MovieProvider({ children }: MovieContextProps) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(movie: Movie) {
    setFavorites((prev) => [...prev, movie]);
  }

  function removeFromFavorites(movieId: number) {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }

  function isInFavorites(movieId: number) {
    return favorites.some((movie) => movie.id === movieId);
  }

  const value: ContextValue = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}
