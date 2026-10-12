
import React, { createContext, useContext, useState } from 'react';

import {
  getFavorites,
  getWatchlist,
  toggleFavorite as toggleStoredFavorite,
  toggleWatchlist as toggleStoredWatchlist,
} from '../utils/storage';

const MovieListsContext = createContext(null);

export function MovieListsProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(() => getFavorites());
  const [watchlistIds, setWatchlistIds] = useState(() => getWatchlist());

  const toggleFavorite = (movieId) => {
    setFavoriteIds(toggleStoredFavorite(movieId));
  };

  const toggleWatchlist = (movieId) => {
    setWatchlistIds(toggleStoredWatchlist(movieId));
  };

  const isFavorite = (movieId) => favoriteIds.includes(movieId);
  const isInWatchlist = (movieId) => watchlistIds.includes(movieId);

  return (
    <MovieListsContext.Provider
      value={{
        favoriteIds,
        watchlistIds,
        toggleFavorite,
        toggleWatchlist,
        isFavorite,
        isInWatchlist,
      }}
    >
      {children}
    </MovieListsContext.Provider>
  );
}

export function useMovieLists() {
  const context = useContext(MovieListsContext);

  if (!context) {
    throw new Error(
      'useMovieLists must be used inside MovieListsProvider'
    );
  }

  return context;
}
