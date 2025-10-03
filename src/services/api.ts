const API_KEY = "f6a213f5f4061199003ed362a6dd4a3f";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const popularMovies = await response.json();

  return popularMovies.results;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const searchedMovies = await response.json();

  return searchedMovies.results;
};
