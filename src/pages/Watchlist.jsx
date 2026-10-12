import React from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import MovieList from '../components/MovieList';
import { useApp } from '../context/AppContext';

export default function Watchlist() {
  const app = useApp();
  const allMovies = [...movies, ...app.cachedMovies.filter((item) => !movies.some((movie) => movie.id === item.id))];
  const savedMovies = allMovies.filter((movie) => app.watchlistIds.includes(movie.id));
  return <section><div className="section-heading"><h1>Your watchlist</h1><span>{savedMovies.length} movies</span></div>{savedMovies.length ? <MovieList movies={savedMovies} isFavorite={app.isFavorite} isInWatchlist={app.isInWatchlist} onToggleFavorite={app.toggleMovieFavorite} onToggleWatchlist={app.toggleMovieWatchlist} /> : <div className="empty-state"><p>Your watchlist is empty.</p><Link className="button" to="/">Discover movies</Link></div>}</section>;
}
