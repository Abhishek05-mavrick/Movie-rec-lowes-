import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  getFavorites,
  getCachedMovies,
  cacheMovie,
  getWatchlist,
  toggleFavorite,
  toggleWatchlist,
} from '../utils/storage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [watchlistIds, setWatchlistIds] = useState(getWatchlist);
  const [favoriteIds, setFavoriteIds] = useState(getFavorites);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cachedMovies, setCachedMovies] = useState(getCachedMovies);

  const value = useMemo(() => ({
    watchlistIds,
    favoriteIds,
    isLoggedIn,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
    cachedMovies,
    toggleMovieWatchlist: (movie) => {
      cacheMovie(movie);
      setCachedMovies(getCachedMovies());
      setWatchlistIds(toggleWatchlist(movie));
    },
    toggleMovieFavorite: (movie) => {
      cacheMovie(movie);
      setCachedMovies(getCachedMovies());
      setFavoriteIds(toggleFavorite(movie));
    },
    isInWatchlist: (id) => watchlistIds.includes(id),
    isFavorite: (id) => favoriteIds.includes(id),
  }), [watchlistIds, favoriteIds, cachedMovies, isLoggedIn]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
