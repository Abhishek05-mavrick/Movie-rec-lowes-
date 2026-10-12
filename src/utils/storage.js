export const STORAGE_KEYS = {
  watchlist: 'movie-discovery-watchlist',
  favorites: 'movie-discovery-favorites',
  movieCache: 'movie-discovery-movie-cache',
};

export const getCachedMovies = () => {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEYS.movieCache) || '[]');
    return Array.isArray(parsed) ? parsed.filter((movie) => movie && Number.isInteger(movie.id)) : [];
  } catch {
    return [];
  }
};

export const cacheMovie = (movie) => {
  if (!movie || !Number.isInteger(movie.id) || typeof window === 'undefined') return;
  const movies = getCachedMovies().filter((item) => item.id !== movie.id);
  setStoredIds(STORAGE_KEYS.movieCache, [...movies, movie]);
};

const getStoredIds = (key) => {
  if (typeof window === 'undefined') return [];
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed)
      ? [...new Set(parsed.filter((id) => Number.isInteger(id)))]
      : [];
  } catch {
    return [];
  }
};

const setStoredIds = (key, ids) => {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
};

export const getWatchlist = () => getStoredIds(STORAGE_KEYS.watchlist);
export const getFavorites = () => getStoredIds(STORAGE_KEYS.favorites);

export const toggleStoredMovie = (key, movieId) => {
  const ids = getStoredIds(key);
  const nextIds = ids.includes(movieId) ? ids.filter((id) => id !== movieId) : [...ids, movieId];
  setStoredIds(key, nextIds);
  return nextIds;
};

export const toggleWatchlist = (movie) => toggleStoredMovie(STORAGE_KEYS.watchlist, typeof movie === 'object' ? movie.id : movie);
export const toggleFavorite = (movie) => toggleStoredMovie(STORAGE_KEYS.favorites, typeof movie === 'object' ? movie.id : movie);
