import React from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../data/movies';
import MovieList from '../components/MovieList';
import { useApp } from '../context/AppContext';

export default function Favorites() {
  const app = useApp();
  const allMovies = [...movies, ...app.cachedMovies.filter((item) => !movies.some((movie) => movie.id === item.id))];
  const savedMovies = allMovies.filter((movie) => app.favoriteIds.includes(movie.id));
  return <section><div className="section-heading"><h1>Your favorites</h1><span>{savedMovies.length} movies</span></div>{savedMovies.length ? <MovieList movies={savedMovies} isFavorite={app.isFavorite} isInWatchlist={app.isInWatchlist} onToggleFavorite={app.toggleMovieFavorite} onToggleWatchlist={app.toggleMovieWatchlist} /> : <div className="empty-state"><p>You have no favorite movies yet.</p><Link className="button" to="/">Discover movies</Link></div>}</section>;
}
