import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies = [], ...actions }) {
  if (!movies.length) {
    return <section className="empty-state"><h2>No movies found</h2><p>Try another search or select a different genre.</p></section>;
  }
  return <section className="movie-grid" aria-label="Movie list">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} {...actions} />)}</section>;
}
