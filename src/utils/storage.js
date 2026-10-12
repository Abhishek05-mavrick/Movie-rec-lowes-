const getStoredIds = (key) => {
  try {
    const value = localStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const setStoredIds = (key, ids) => localStorage.setItem(key, JSON.stringify(ids));

export const getWatchlist = () => getStoredIds('movie-discovery-watchlist');
export const getFavorites = () => getStoredIds('movie-discovery-favorites');

export const toggleStoredMovie = (key, movieId) => {
  const ids = getStoredIds(key);
  const nextIds = ids.includes(movieId) ? ids.filter((id) => id !== movieId) : [...ids, movieId];
  setStoredIds(key, nextIds);
  return nextIds;
};

export const toggleWatchlist = (movieId) => toggleStoredMovie('movie-discovery-watchlist', movieId);
export const toggleFavorite = (movieId) => toggleStoredMovie('movie-discovery-favorites', movieId);
